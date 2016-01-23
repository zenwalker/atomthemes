from celery import Celery
import os

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'atomthemes.settings')
from django.conf import settings

celery_app = Celery('atomthemes', broker='redis://localhost')
celery_app.config_from_object('django.conf:settings')
celery_app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)
