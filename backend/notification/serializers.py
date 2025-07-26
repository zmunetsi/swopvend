from rest_framework import serializers
from .models import Notification

class NotificationSerializer(serializers.ModelSerializer):
    recipient_username = serializers.CharField(source='recipient.username', read_only=True)

    class Meta:
        model = Notification
        fields = [
            'id',
            'recipient',
            'recipient_username',
            'channel',           # <-- Add this line
            'verb',
            'description',
            'is_read',
            'created_at',
        ]
        read_only_fields = ['id', 'recipient', 'recipient_username', 'created_at']