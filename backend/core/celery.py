# project/celery.py
import os
from celery import Celery

# set default Django settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')

app = Celery('core')

# pull broker/backend URLs from Django settings
app.config_from_object('django.conf:settings', namespace='CELERY')

# auto-discover @shared_task modules in installed apps
app.autodiscover_tasks()
