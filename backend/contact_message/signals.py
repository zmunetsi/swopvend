# contact/signals.py
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import ContactMessage
from .tasks import send_contact_email

@receiver(post_save, sender=ContactMessage)
def notify_on_new_contact_message(sender, instance, created, **kwargs):
    """
    Signal handler to enqueue an email notification task when a new contact message is created.
    """
    if created:
        send_contact_email.delay(
            instance.name,
            instance.email,
            instance.reason,
            instance.message,
        )