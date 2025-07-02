from django.contrib import admin
from .models import ContactMessage

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "reason", "message", "created_at")
    search_fields = ("name", "email", "reason", "message")
    list_filter = ("reason", "created_at")
