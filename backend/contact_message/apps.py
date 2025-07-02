from django.apps import AppConfig


class ContactMessageConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'contact_message'
    
    def ready(self):
        # Ensure signals are registered
        import contact_message.signals  # noqa
