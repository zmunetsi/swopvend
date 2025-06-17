# app/views.py
from rest_framework import viewsets, permissions
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Item, ItemImage
from .serializers import ItemSerializer

class ItemImageViewSet(viewsets.ModelViewSet):
    queryset = ItemImage.objects.all()
    serializer_class = ItemSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]


class PublicItemListView(viewsets.ReadOnlyModelViewSet):
    """List all available items (public)."""
    queryset = Item.objects.filter(status="available").select_related('trader')
    serializer_class = ItemSerializer
    permission_classes = [permissions.AllowAny]

class ItemViewSet(viewsets.ModelViewSet):
    """CRUD for items, with Cloudinary-backed image uploads."""
    queryset = Item.objects.all().select_related('trader')
    serializer_class = ItemSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]  # handle multipart uploads

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

# Optional: detail route for retrieving a single item by ID with public access

    @action(detail=True, methods=['get'], permission_classes=[permissions.AllowAny], url_path='public')
    def retrieve_public(self, request, pk=None):
        """Retrieve single item by ID (public).
        Example URL: /api/items/{pk}/public/"""
        item = self.get_object()
        serializer = self.get_serializer(item)
        return Response(serializer.data)
