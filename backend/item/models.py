# app/models.py
from django.db import models
from django.contrib.auth import get_user_model
from cloudinary.models import CloudinaryField
from datetime import timedelta
from django.utils import timezone
from location.models import Country, City
from django.utils.text import slugify
import uuid

User = get_user_model()

class Item(models.Model):
    STATUS_CHOICES = [
        ('available', 'Available'),
        ('swapped',   'Swapped'),
        ('given',     'Given Away'),
        ('processing', 'Processing'),
        ('archived', 'Archived'),
    ]

    trader = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='items'
    )
    title = models.CharField(max_length=255, default='Untitled Item')
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='available'
    )
    description = models.TextField()
    featured_image = CloudinaryField(
        'image',
        folder='swopvend/items',
        blank=True, null=True
    )
    category = models.CharField(max_length=100, default='General')
    condition = models.CharField(max_length=50, default='Good')
    preferred_item = models.CharField(max_length=100, blank=True, null=True)
    country = models.ForeignKey(
        Country,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='items'
    )
    city = models.ForeignKey(
        City,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='items'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    expires_at = models.DateTimeField(null=True, blank=True)
    is_archived = models.BooleanField(default=False)
    slug = models.SlugField(max_length=255, unique=True, blank=True)

    def save(self, *args, **kwargs):
        # Generate slug if not set or if title changed
        if not self.slug or slugify(self.title) not in self.slug:
            base_slug = slugify(self.title)
            unique_slug = base_slug
            num = 1
            while Item.objects.filter(slug=unique_slug).exclude(pk=self.pk).exists():
                unique_slug = f"{base_slug}-{uuid.uuid4().hex[:6]}"
                num += 1
            self.slug = unique_slug
        # Set expires_at if not set
        if not self.expires_at:
            self.expires_at = (self.created_at or timezone.now()) + timedelta(days=1)
        # If archived, always set status to 'archived'
        if self.is_archived:
            self.status = 'archived'
        super().save(*args, **kwargs)

    def is_expired(self):
        return self.expires_at and timezone.now() > self.expires_at

    def archive(self):
        self.is_archived = True
        self.status = 'archived'  # <-- Ensure status is set
        self.save()

    def __str__(self):
        return self.title

class ItemImage(models.Model):
    item = models.ForeignKey(
        Item,
        related_name='extra_images',
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )
    image = CloudinaryField(
        'image',
        folder='swopvend/items/extras',
        blank=True, null=True
    )

    def __str__(self):
        return f"Additional image for {self.item.title}" if self.item else "Unlinked image"






