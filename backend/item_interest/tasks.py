from celery import shared_task
from django.core.mail import EmailMultiAlternatives, send_mail
from django.template.loader import render_to_string
from django.conf import settings

@shared_task
def notify_item_owner_interest(item_id, interested_user_id, note):
    from item.models import Item
    from trader.models import Trader
    item = Item.objects.get(pk=item_id)
    owner = item.trader
    interested_user = Trader.objects.get(pk=interested_user_id)
    subject = f"Someone is interested in your item: {item.title}"
    context = {
        "owner_name": owner.get_full_name() or owner.username,
        "item_title": item.title,
        "interested_user_name": interested_user.get_full_name() or interested_user.username,
        "interested_user_email": interested_user.email,
        "note": note,
        "item_url": f"https://swopvend.com/items/{item.id}/"
    }
    text_body = render_to_string("emails/item_interest/item_interest_given_away_owner.txt", context)
    html_body = render_to_string("emails/item_interest/item_interest_given_away_owner.html", context)
    msg = EmailMultiAlternatives(subject, text_body, settings.DEFAULT_FROM_EMAIL, [owner.email])
    msg.attach_alternative(html_body, "text/html")
    msg.send()

@shared_task
def notify_interested_user_swap_update(email, user_name, item_title, swap_status, item_url):
    subject = "Update on your item interest - SwopVend"
    context = {
        "user_name": user_name,
        "item_title": item_title,
        "swap_status": swap_status,
        "item_url": item_url
    }
    text_body = render_to_string("emails/item_interest/item_interest_swap_update.txt", context)
    html_body = render_to_string("emails/item_interest/item_interest_swap_update.html", context)
    msg = EmailMultiAlternatives(subject, text_body, settings.DEFAULT_FROM_EMAIL, [email])
    msg.attach_alternative(html_body, "text/html")
    msg.send()

@shared_task
def notify_interested_user_item_archived(email, user_name, item_title, item_url):
    subject = "Free item archived - SwopVend"
    context = {
        "user_name": user_name,
        "item_title": item_title,
        "item_url": item_url
    }
    text_body = render_to_string("emails/item_interest/item_interest_archived.txt", context)
    html_body = render_to_string("emails/item_interest/item_interest_archived.html", context)
    msg = EmailMultiAlternatives(subject, text_body, settings.DEFAULT_FROM_EMAIL, [email])
    msg.attach_alternative(html_body, "text/html")
    msg.send()

@shared_task
def notify_item_interest_user(email, username, item_title):
    send_mail(
        subject='Item update on SwopVend',
        message=f"Hi {username},\n\nThe item '{item_title}' you showed interest in may now be available. Check it out on SwopVend.",
        from_email='noreply@swopvend.com',
        recipient_list=[email],
        fail_silently=True,
    )

@shared_task
def notify_interested_users_item_available_again(item_id):
    from item.models import Item
    item = Item.objects.get(pk=item_id)
    interests = item.interests.filter(interest_type__in=['free', 'processing'])
    for interest in interests:
        user = interest.user
        subject = f"Item available again: {item.title}"
        context = {
            "user_name": user.get_full_name() or user.username,
            "item_title": item.title,
            "swap_status": "declined",
            "item_url": f"https://swopvend.com/items/{item.id}/"
        }
        text_body = render_to_string("emails/item_interest/item_interest_swap_update.txt", context)
        html_body = render_to_string("emails/item_interest/item_interest_swap_update.html", context)
        msg = EmailMultiAlternatives(subject, text_body, settings.DEFAULT_FROM_EMAIL, [user.email])
        msg.attach_alternative(html_body, "text/html")
        msg.send()

@shared_task
def notify_interested_users_item_archived(item_id):
    from item.models import Item
    item = Item.objects.get(pk=item_id)
    interests = item.interests.filter(interest_type='free')
    for interest in interests:
        user = interest.user
        subject = f"Free item archived: {item.title}"
        context = {
            "user_name": user.get_full_name() or user.username,
            "item_title": item.title,
            "item_url": f"https://swopvend.com/items/{item.id}/"
        }
        text_body = render_to_string("emails/item_interest/item_interest_given_away_archived.txt", context)
        html_body = render_to_string("emails/item_interest/item_interest_given_away_archived.html", context)
        msg = EmailMultiAlternatives(subject, text_body, settings.DEFAULT_FROM_EMAIL, [user.email])
        msg.attach_alternative(html_body, "text/html")
        msg.send()

@shared_task
def notify_admin_new_interest(item_title, owner_name, owner_email, interested_user_name, interested_user_email, interest_type, note, item_url):
    subject = f"New item interest registered: {item_title}"
    context = {
        "item_title": item_title,
        "owner_name": owner_name,
        "owner_email": owner_email,
        "interested_user_name": interested_user_name,
        "interested_user_email": interested_user_email,
        "interest_type": interest_type,
        "note": note,
        "item_url": item_url
    }
    text_body = render_to_string("emails/item_interest/item_interest_admin_notify.txt", context)
    html_body = render_to_string("emails/item_interest/item_interest_admin_notify.html", context)
    msg = EmailMultiAlternatives(subject, text_body, settings.DEFAULT_FROM_EMAIL, settings.ADMIN_EMAILS)
    msg.attach_alternative(html_body, "text/html")
    msg.send()
