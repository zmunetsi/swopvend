
# swap/tasks.py
from celery import shared_task
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.conf import settings
from .models import SwapMessage

@shared_task
def send_swap_message_email(message_id):
    """
    Celery task to send an email notification when a new swap message is created.
    """
    try:
        msg = SwapMessage.objects.select_related(
            'sender', 'receiver', 'swap_request__offered_item', 'swap_request__requested_item'
        ).get(pk=message_id)
    except SwapMessage.DoesNotExist:
        return

    # Prepare email details
    subject = f"New message on Swap #{msg.swap_request.id}"
    recipient_email = msg.receiver.email  # adjust attribute as needed
    context = {
        'sender': msg.sender,                # or .username
        'content': msg.content,
        'swap_id': msg.swap_request.id,
        'offered_item': msg.swap_request.offered_item,
        'requested_item': msg.swap_request.requested_item,
        'site_url': "www.swopvend.com",            # e.g. https://yourdomain.com
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
