# swap/tasks.py
from celery import shared_task
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.conf import settings
from django.contrib.contenttypes.models import ContentType
from notification.models import Notification
from .models import SwapMessage, SwapRequest

@shared_task
def send_swap_message_email(message_id):
    """
    Celery task to send an email notification when a new swap message is created,
    and store the notification in the database.
    """
    try:
        msg = SwapMessage.objects.select_related(
            'sender', 'receiver', 'swap_request__offered_item', 'swap_request__requested_item'
        ).get(pk=message_id)
    except SwapMessage.DoesNotExist:
        return

    # Prepare email details
    subject = f"New message on Swap #{msg.swap_request.id}"
    recipient_email = msg.receiver.email
    context = {
        'sender': msg.sender,
        'content': msg.content,
        'swap_id': msg.swap_request.id,
        'offered_item': msg.swap_request.offered_item,
        'requested_item': msg.swap_request.requested_item,
        'site_url': "www.swopvend.com",
    }
    # Render templates
    text_content = render_to_string('emails/swap_message_notification.txt', context)
    html_content = render_to_string('emails/swap_message_notification.html', context)

    # Create and send email
    email = EmailMultiAlternatives(
        subject=subject,
        body=text_content,
        from_email=settings.DEFAULT_FROM_EMAIL,
        to=[recipient_email],
    )
    email.attach_alternative(html_content, 'text/html')
    email.send()

    # Store the email notification
    Notification.objects.create(
        recipient=msg.receiver,
        channel='email',
        verb='sent you a swap message (email)',
        description=f"{msg.sender.username} sent you a message on Swap #{msg.swap_request.id}.",
        content_type=ContentType.objects.get_for_model(msg.swap_request),
        object_id=msg.swap_request.id,
    )

@shared_task
def send_swap_request_email(swap_id):
    try:
        swap = SwapRequest.objects.select_related(
            'from_trader', 'to_trader', 'offered_item', 'requested_item'
        ).get(pk=swap_id)
    except SwapRequest.DoesNotExist:
        return

    subject = f"New Swap Request for {swap.requested_item.title}"
    recipient_email = swap.to_trader.email
    context = {
        'from_trader': swap.from_trader,
        'offered_item': swap.offered_item,
        'requested_item': swap.requested_item,
        'swap_id': swap.id,
        'site_url': "https://www.swopvend.com",
    }
    text_content = render_to_string('emails/swap/swap_request_notification.txt', context)
    html_content = render_to_string('emails/swap/swap_request_notification.html', context)

    email = EmailMultiAlternatives(
        subject=subject,
        body=text_content,
        from_email=settings.DEFAULT_FROM_EMAIL,
        to=[recipient_email],
    )
    email.attach_alternative(html_content, 'text/html')
    email.send()

    # Store the email notification
    Notification.objects.create(
        recipient=swap.to_trader,
        channel='email',
        verb='sent you a swap request (email)',
        description=f"{swap.from_trader.username} has proposed a swap for your item: {swap.requested_item.title}.",
        content_type=ContentType.objects.get_for_model(swap),
        object_id=swap.id,
    )
