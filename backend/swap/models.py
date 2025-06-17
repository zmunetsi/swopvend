# app/models.py
from django.db import models
from trader.models import Trader
from item.models import Item


class SwapRequest(models.Model):
    from_trader    = models.ForeignKey(
        Trader,
        on_delete=models.CASCADE,
        related_name='sent_requests'
    )
    to_trader      = models.ForeignKey(
        Trader,
        on_delete=models.CASCADE,
        related_name='received_requests'
    )
    offered_item   = models.ForeignKey(
        Item,
        on_delete=models.CASCADE,
        related_name='offered_in_requests'
    )
    requested_item = models.ForeignKey(
        Item,
        on_delete=models.CASCADE,
        related_name='requested_in_requests'
    )

    status = models.CharField(
        max_length=20,
        choices=[
            ('pending',   'Pending'),
            ('accepted',  'Accepted'),
            ('declined',  'Declined'),
            ('cancelled', 'Cancelled'),
        ],
        default='pending'
    )
    created_at  = models.DateTimeField(auto_now_add=True)
    updated_at  = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('from_trader', 'offered_item', 'requested_item')

    def __str__(self):
        return (
            f"{self.from_trader} offers {self.offered_item} "
            f"for {self.requested_item} (to {self.to_trader})"
        )


class SwapMessage(models.Model):
    """
    Represents a chat message within a SwapRequest thread.
    """
    swap_request = models.ForeignKey(
        SwapRequest,
        related_name='messages',
        on_delete=models.CASCADE
    )
    sender = models.ForeignKey(
        Trader,
        related_name='sent_swap_messages',
        on_delete=models.CASCADE
    )
    receiver = models.ForeignKey(
        Trader,
        related_name='received_swap_messages',
        on_delete=models.CASCADE
    )
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['created_at']

    def __str__(self):
        return (
            f"[{{self.created_at:%Y-%m-%d %H:%M}}] "
            f"{self.sender} → {self.receiver} "
            f"(SwapRequest: {self.swap_request.id})" )