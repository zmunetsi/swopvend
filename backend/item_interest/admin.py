from django.contrib import admin, messages
from .models import ItemInterest
from .tasks import notify_item_interest_user

@admin.register(ItemInterest)
class ItemInterestAdmin(admin.ModelAdmin):
    list_display = ('user_username', 'item_title', 'interest_type', 'created_at')
    search_fields = ('user__username', 'item__title', 'item__slug')
    list_filter = ('interest_type', 'created_at')
    ordering = ('-created_at',)
    actions = ['notify_users_about_item']

    def user_username(self, obj):
        return obj.user.username
    user_username.short_description = 'User'

    def item_title(self, obj):
        return obj.item.title
    item_title.short_description = 'Item'

    @admin.action(description='Notify users about selected interests (via email)')
    def notify_users_about_item(self, request, queryset):
        count = 0
        for interest in queryset:
            user = interest.user
            item = interest.item

            # Enqueue task to Celery
            notify_item_interest_user.delay(
                email=user.email,
                username=user.username,
                item_title=item.title
            )
            count += 1

        self.message_user(request, f"{count} user(s) queued for email notification.", level=messages.INFO)
