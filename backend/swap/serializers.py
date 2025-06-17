# app/serializers.py
from rest_framework import serializers
from trader.serializers import TraderSerializer
from item.serializers import ItemSerializer
from .models import SwapRequest, SwapMessage


class SwapMessageSerializer(serializers.ModelSerializer):
    """
    Serializer for individual messages in a swap request.
    Includes full sender and receiver trader info.
    """
    sender = TraderSerializer(read_only=True)
    receiver = TraderSerializer(read_only=True)

    class Meta:
        model = SwapMessage
        fields = ['id', 'content', 'sender', 'receiver', 'created_at']
        read_only_fields = ['id', 'created_at', 'sender', 'receiver']


class SwapRequestSerializer(serializers.ModelSerializer):
    """
    Serializer for swap requests.
    Uses nested serializers for read operations and PK fields for write.
    """
    from_trader    = TraderSerializer(read_only=True)
    to_trader      = TraderSerializer(read_only=True)
    # Nested representation for reads
    offered_item   = ItemSerializer(read_only=True)
    requested_item = ItemSerializer(read_only=True)
    messages       = SwapMessageSerializer(many=True, read_only=True)

    class Meta:
        model = SwapRequest
        fields = [
            'id',
            'from_trader',
            'to_trader',
            'offered_item',
            'requested_item',
            'offered_item_id',
            'requested_item_id',
            'status',
            'created_at',
            'updated_at',
            'messages',
        ]
        read_only_fields = [
            'id',
            'from_trader',
            'to_trader',
            'offered_item',
            'requested_item',
            'created_at',
            'updated_at',
            'messages',
        ]
