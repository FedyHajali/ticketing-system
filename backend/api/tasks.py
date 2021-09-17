from celery import app
from .models import Ticket
from datetime import datetime


@app.shared_task(bind=True)
def api_task(self):
    ticket = Ticket.objects.get(expiration__lte=datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
    ticket.status='EX'
    ticket.save()
    print('DAJE')