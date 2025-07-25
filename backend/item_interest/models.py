from django.db import models
from django.conf import settings

class ItemInterest(models.Model):
    INTEREST_TYPE_CHOICES = [
        ('free', 'Free Item'),
        ('processing', 'Processing Swap'),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='item_interests'
    )
    item = models.ForeignKey(
        'item.Item',  # Update if needed
        on_delete=models.CASCADE,
        related_name='interests'
    )
    interest_type = models.CharField(
        max_length=20,
        choices=INTEREST_TYPE_CHOICES
    )
    note = models.TextField(blank=True)  # ✅ Optional note
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'item', 'interest_type')
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user.username} interested in {self.item} as {self.interest_type}"
