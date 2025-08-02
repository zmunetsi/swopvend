# app/views.py
from rest_framework import viewsets, permissions, status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Item, ItemImage
from .serializers import ItemSerializer
from datetime import timedelta
from django.utils import timezone
from rest_framework.views import APIView
from item_interest.tasks import notify_interested_users_item_archived
from django.shortcuts import get_object_or_404

class ItemImageViewSet(viewsets.ModelViewSet):
    queryset = ItemImage.objects.all()
    serializer_class = ItemSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]


class PublicItemListView(viewsets.ReadOnlyModelViewSet):
    """List all available, given, and processing items (public)."""
    queryset = Item.objects.filter(status__in=["available", "given", "processing"]).select_related('trader')
    serializer_class = ItemSerializer
    permission_classes = [permissions.AllowAny]

    def get_object(self):
        """
        Allow lookup by slug or id for public detail.
        """
        lookup_value = self.kwargs.get(self.lookup_field or 'pk')
        queryset = self.get_queryset()
        # Try slug first
        obj = queryset.filter(slug=lookup_value).first()
        if obj:
            return obj
        # Fallback to id
        obj = queryset.filter(pk=lookup_value).first()
        if obj:
            return obj
        raise get_object_or_404(queryset, pk=lookup_value)

class ItemViewSet(viewsets.ModelViewSet):
    """CRUD for items, with Cloudinary-backed image uploads."""
    queryset = Item.objects.all().select_related('trader')
    serializer_class = ItemSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]  # handle multipart uploads

    def get_object(self):
        """
        Allow lookup by slug or id for private detail.
        """
        lookup_value = self.kwargs.get(self.lookup_field or 'pk')
        queryset = self.get_queryset()
        # Try slug first
        obj = queryset.filter(slug=lookup_value).first()
        if obj:
            self.check_object_permissions(self.request, obj)
            return obj
        # Fallback to id
        obj = queryset.filter(pk=lookup_value).first()
        if obj:
            self.check_object_permissions(self.request, obj)
            return obj
        raise get_object_or_404(queryset, pk=lookup_value)

    def perform_create(self, serializer):
        # Associate the item with the logged-in user
        serializer.save(trader=self.request.user)

    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def user(self, request):
        """Retrieve items belonging to the authenticated user."""
        items = self.get_queryset().filter(trader=request.user)
        page = self.paginate_queryset(items)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(items, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['get'], permission_classes=[permissions.AllowAny], url_path='public')
    def retrieve_public(self, request, pk=None):
        """Retrieve single item by slug or ID (public).
        Example URL: /api/items/{slug-or-id}/public/"""
        item = self.get_object()
        serializer = self.get_serializer(item)
        return Response(serializer.data)

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def renew(self, request, pk=None):
        """Renew an archived item (extends expiry by 30 days and unarchives)."""
        item = self.get_object()
        if item.trader != request.user:
            return Response({'detail': 'Not allowed.'}, status=status.HTTP_403_FORBIDDEN)
        if not (item.is_archived or item.status == 'archived'):
            return Response({'detail': 'Item is not archived.'}, status=status.HTTP_400_BAD_REQUEST)
        item.expires_at = timezone.now() + timedelta(days=30)
        item.is_archived = False
        item.status = 'available'  # Reset status to available
        item.save()
        return Response({'detail': 'Item renewed successfully.'})

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def give_away(self, request, pk=None):
        """Mark an item as given away and renew for 30 days (do not archive)."""
        item = self.get_object()
        if item.trader != request.user:
            return Response({'detail': 'Not allowed.'}, status=status.HTTP_403_FORBIDDEN)
        item.status = 'given'
        item.is_archived = False
        item.expires_at = timezone.now() + timedelta(days=30)
        item.save()
        return Response({'detail': 'Item marked as given away and renewed for 30 days.'})

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def archive(self, request, pk=None):
        """Archive (soft delete) an item."""
        item = self.get_object()
        if item.trader != request.user:
            return Response({'detail': 'Not allowed.'}, status=status.HTTP_403_FORBIDDEN)
        if item.is_archived or item.status == 'archived':
            return Response({'detail': 'Item is already archived.'}, status=status.HTTP_400_BAD_REQUEST)
        item.archive()
        notify_interested_users_item_archived.delay(item.id)
        return Response({'detail': 'Item archived and users notified.'}, status=status.HTTP_200_OK)

class ItemArchiveView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        try:
            item = Item.objects.get(pk=pk)
            if item.trader != request.user:
                return Response({"detail": "Not allowed."}, status=status.HTTP_403_FORBIDDEN)
            item.archive()
            notify_interested_users_item_archived.delay(item.id)
            return Response({"detail": "Item archived and users notified."}, status=status.HTTP_200_OK)
        except Item.DoesNotExist:
            return Response({"detail": "Item not found."}, status=status.HTTP_404_NOT_FOUND)
