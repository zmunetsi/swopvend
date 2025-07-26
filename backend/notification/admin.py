from django.contrib import admin
from .models import Notification

@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ('recipient', 'verb', 'description', 'is_read', 'created_at')
    search_fields = ('recipient__username', 'verb', 'description')
    list_filter = ('is_read', 'created_at')
