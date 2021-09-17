from celery import shared_task 

@shared_task 
def prova():
     print('Ciao')
     # Another trick