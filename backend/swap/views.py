# app/views.py
from rest_framework import viewsets, permissions
from .models import SwapRequest, SwapMessage
from .serializers import SwapRequestSerializer, SwapMessageSerializer
from django.shortcuts import get_object_or_404
from item.models import Item

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
          # Derive from_trader from the authenticated user
        from_trader = self.request.user
        # Retrieve item IDs from incoming data
        offered_item_id = self.request.data.get('offered_item_id') or self.request.data.get('offered_item')
        requested_item_id = self.request.data.get('requested_item_id') or self.request.data.get('requested_item')
        # Fetch actual Item instances
        offered_item = get_object_or_404(Item, pk=offered_item_id)
        requested_item = get_object_or_404(Item, pk=requested_item_id)
        # Determine recipient trader from the requested item
        to_trader = requested_item.trader

        serializer.save(
            from_trader=from_trader,
            to_trader=to_trader,
            offered_item=offered_item,
            requested_item=requested_item
        )

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
