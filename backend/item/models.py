# app/models.py
from django.db import models
from django.contrib.auth import get_user_model
from cloudinary.models import CloudinaryField

User = get_user_model()

class Item(models.Model):
    STATUS_CHOICES = [
        ('available', 'Available'),
        ('swapped',   'Swapped'),
        ('given',     'Given Away'),
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
    location = models.CharField(max_length=255, default='Unknown')
    preferred_item = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

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
    


    


