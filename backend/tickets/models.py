from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group

# Create your models here.

class Ticket(models.Model):
    class StatusChoices(models.TextChoices):
        OPEN = 'OP', 'Open'
        CLOSED = 'CL', 'Closed'
        PENDING = 'PE', 'Pending'
        RESOLVED = 'RE', 'Resolved'
        WAITING_ON_BRANCH = 'WB', 'Waiting on Branch'
        WAITING_ON_3RD_PARTY = 'W3', 'Waiting on 3rd Party'

    # Fields
    title = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(
        max_length=2, blank=False, choices=StatusChoices.choices, default=StatusChoices.OPEN)

    # Foreign keys
    created_by = models.ForeignKey(
        get_user_model(), on_delete=models.CASCADE, related_name='created_tickets')
    groups = models.ManyToManyField(Group, related_name='profiles')
    destination = models.ManyToManyField(get_user_model(), related_name='profiles')

    def __str__(self):
        return f"({self.id}) {self.title}"