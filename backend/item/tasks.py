from celery import shared_task
from django.utils import timezone
from django.core.mail import send_mail
from django.conf import settings
from .models import Item
from django.template.loader import render_to_string

@shared_task
def autoarchive_expired_items():
    now = timezone.now()
    soon = now + timezone.timedelta(days=3)

    # Notify users 3 days before expiry
    expiring_soon = Item.objects.filter(
        is_archived=False,
        expires_at__gt=now,
        expires_at__lte=soon
    )
    for item in expiring_soon:
        context = {
            "user": item.trader,
            "item": item,
        }
        text_content = render_to_string('emails/item/item_expiring_soon.txt', context)
        html_content = render_to_string('emails/item/item_expiring_soon.html', context)
        send_mail(
            subject="Your SwopVend listing is expiring soon",
            message=text_content,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[item.trader.email],
            html_message=html_content,
            fail_silently=True,
        )

    # Archive expired items and notify users
    expired_items = Item.objects.filter(
        is_archived=False,
        expires_at__lte=now
    )
    for item in expired_items:
        item.is_archived = True
        item.save()
        context = {
            "user": item.trader,
            "item": item,
        }
        text_content = render_to_string('emails/item/item_archived.txt', context)
        html_content = render_to_string('emails/item/item_archived.html', context)
        send_mail(
            subject="Your SwopVend listing has been archived",
            message=text_content,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[item.trader.email],
            html_message=html_content,
            fail_silently=True,
        )

    return f"Archived {expired_items.count()} expired items and notified {expiring_soon.count()} expiring soon."