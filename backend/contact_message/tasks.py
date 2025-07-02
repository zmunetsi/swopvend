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

@shared_task
def send_contact_email(name, email, reason, message):
    """
    Celery task to send email notifications for a new contact message.
    Sends to both admin and user.
    """
    site_url = "https://www.swopvend.com"  # Update as needed

    # --- Admin notification ---
    admin_subject = f"New Contact Message: {reason} from {name}"
    admin_context = {
        "name": name,
        "email": email,
        "reason": reason,
        "message": message,
        "site_url": site_url,
    }
    admin_text = render_to_string("emails/contact_message/contact_message_notification_admin.html", admin_context)
    admin_html = render_to_string("emails/contact_message/contact_message_notification_admin.html", admin_context)

    admin_email = EmailMultiAlternatives(
        subject=admin_subject,
        body=admin_text,
        from_email=settings.DEFAULT_FROM_EMAIL,
        to=[settings.DEFAULT_FROM_EMAIL],
    )
    admin_email.attach_alternative(admin_html, "text/html")
    admin_email.send()

    # --- User confirmation ---
    user_subject = "We received your message | SwopVend"
    user_context = {
        "name": name,
        "reason": reason,
        "message": message,
    }
    user_text = render_to_string("emails/contact_message/contact_message_notification_user.html", user_context)
    user_html = render_to_string("emails/contact_message/contact_message_notification_user.html", user_context)

    user_email = EmailMultiAlternatives(
        subject=user_subject,
        body=user_text,
        from_email=settings.DEFAULT_FROM_EMAIL,
        to=[email],
    )
    user_email.attach_alternative(user_html, "text/html")
    user_email.send()
