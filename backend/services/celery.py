#from backend.api.models import Ticket
import os 
from celery import Celery 
# Set default Django settings 
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'services.settings') 
app = Celery('services')   
# Celery will apply all configuration keys with defined namespace 
app.config_from_object('django.conf:settings', namespace='CELERY')   
# Load tasks from all registered apps 
app.autodiscover_tasks()