# swap/signals.py
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import SwapMessage
from .tasks import send_swap_message_email

@receiver(post_save, sender=SwapMessage)
def notify_on_new_swap_message(sender, instance, created, **kwargs):
    """
    Signal handler to enqueue an email notification task when a new swap message is created.
    """
    if created:
        send_swap_message_email.delay(instance.id)