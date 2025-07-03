from celery import shared_task
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.conf import settings
from django.contrib.auth import get_user_model

@shared_task
def send_welcome_email(user_id, email, name, date_joined):
    site_url = "https://www.swopvend.com"
    admin_url = f"{site_url}/admin/trader/user/{user_id}/change/"

    # User email
    user_subject = "Welcome to SwopVend!"
    user_context = {
        "name": name,
        "site_url": site_url,
    }
    user_text = render_to_string("emails/trader/welcome_email_user.txt", user_context)
    user_html = render_to_string("emails/trader/welcome_email_user.html", user_context)
    user_email = EmailMultiAlternatives(
        subject=user_subject,
        body=user_text,
        from_email=settings.DEFAULT_FROM_EMAIL,
        to=[email],
    )
    user_email.attach_alternative(user_html, "text/html")
    user_email.send()

    # Admin email
    admin_subject = "New User Registered on SwopVend"
    admin_context = {
        "name": name,
        "email": email,
        "date_joined": date_joined,
        "admin_url": admin_url,
    }
    admin_text = render_to_string("emails/trader/welcome_email_admin.txt", admin_context)
    admin_html = render_to_string("emails/trader/welcome_email_admin.html", admin_context)
    admin_email = EmailMultiAlternatives(
        subject=admin_subject,
        body=admin_text,
        from_email=settings.DEFAULT_FROM_EMAIL,
        to=[settings.DEFAULT_FROM_EMAIL],
    )
    admin_email.attach_alternative(admin_html, "text/html")
    admin_email.send()