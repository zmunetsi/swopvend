# app/views.py
from rest_framework import viewsets, permissions
from .models import SwapRequest, SwapMessage
from .serializers import SwapRequestSerializer, SwapMessageSerializer
from django.shortcuts import get_object_or_404
from item.models import Item
from rest_framework.response import Response
from rest_framework import status
from rest_framework import serializers
from item_interest.tasks import (
    notify_interested_users_item_available_again,
    notify_interested_user_swap_update
)


class SwapRequestViewSet(viewsets.ModelViewSet):
    """ViewSet for listing, retrieving, creating, and updating swap requests."""
    queryset = SwapRequest.objects.all()
    serializer_class = SwapRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Prefetch related traders and items for efficient retrieval
        return SwapRequest.objects.select_related(
            'from_trader', 'to_trader', 'offered_item', 'requested_item'
        )

    def perform_create(self, serializer):
        try:
            from_trader = self.request.user
            offered_item_id = self.request.data.get('offered_item_id') or self.request.data.get('offered_item')
            requested_item_id = self.request.data.get('requested_item_id') or self.request.data.get('requested_item')
            offered_item = get_object_or_404(Item, pk=offered_item_id)
            requested_item = get_object_or_404(Item, pk=requested_item_id)
            to_trader = requested_item.trader

            # Prevent user from swapping their own item
            if from_trader == to_trader:
                raise serializers.ValidationError({"detail": "You cannot propose a swap on your own item."})

            swap = serializer.save(
                from_trader=from_trader,
                to_trader=to_trader,
                offered_item=offered_item,
                requested_item=requested_item
            )

            # Only update status if swap was created
            offered_item.status = 'processing'
            offered_item.save(update_fields=['status'])
            requested_item.status = 'processing'
            requested_item.save(update_fields=['status'])

        except Exception as e:
            raise serializers.ValidationError({"detail": f"Swap creation failed: {str(e)}"})

    def create(self, request, *args, **kwargs):
        try:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)  # <-- Validate first!
            swap = self.perform_create(serializer)
            serializer = self.get_serializer(swap)
            return Response(
                {"detail": "Swap request created successfully.", "data": serializer.data},
                status=status.HTTP_201_CREATED
            )
        except serializers.ValidationError as ve:
            return Response(ve.detail, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(
                {"detail": f"Unexpected error: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def update(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)
        swap = self.get_object()
        item = swap.requested_item

        # Check status in request data (adjust field name as needed)
        new_status = request.data.get('status')
        if new_status == 'declined':
            # Notify all interested users that the item is available again
            notify_interested_users_item_available_again.delay(item.id)
        elif new_status == 'accepted':
            # Notify all interested users that their interest is no longer valid
            interests = item.interests.filter(interest_type__in=['free', 'processing'])
            for interest in interests:
                notify_interested_user_swap_update.delay(
                    interest.user.email,
                    interest.user.get_full_name() or interest.user.username,
                    item.title,
                    "accepted",
                    f"https://swopvend.com/items/{item.id}/"
                )
        return response


class SwapMessageViewSet(viewsets.ModelViewSet):
    """ViewSet for managing chat messages within a swap request."""
    serializer_class = SwapMessageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        swap_pk = self.kwargs.get('swap_pk')
        return SwapMessage.objects.filter(swap_request_id=swap_pk)

    def perform_create(self, serializer):
        swap = SwapRequest.objects.get(pk=self.kwargs['swap_pk'])
        # Current user is the trader
        user_trader = self.request.user
        # derive receiver: the other party in the swap
        other = swap.to_trader if user_trader == swap.from_trader else swap.from_trader

        serializer.save(
            sender=user_trader,
            receiver=other,
            swap_request=swap
        )
