from celery import app
from .models import Ticket
from datetime import datetime


@app.shared_task(bind=True)
def check_expired(self):
    tickets = Ticket.objects.filter(expiration__lte=datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
    if tickets.count==0:
        pass
    else:
        tickets.update(status='EX')
    print('Check executed')