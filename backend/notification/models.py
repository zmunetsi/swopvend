from django.db import models
from django.conf import settings
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType

class Notification(models.Model):
    CHANNEL_CHOICES = [
        ('inapp', 'In-App'),
        ('email', 'Email'),
        ('sms', 'SMS'),
    ]
    recipient = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='notifications'
    )
    channel = models.CharField(max_length=10, choices=CHANNEL_CHOICES, default='inapp')
    verb = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    # Generic relation to any object (e.g., swap, item, etc.)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE, null=True, blank=True)
    object_id = models.PositiveIntegerField(null=True, blank=True)
    target = GenericForeignKey('content_type', 'object_id')
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.recipient} - {self.channel} - {self.verb} - {self.created_at}"
