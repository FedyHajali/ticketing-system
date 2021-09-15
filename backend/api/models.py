from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from django.db.models.deletion import CASCADE
# Create your models here.


class Topic(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    group = models.ForeignKey(Group, on_delete=CASCADE)
    users = models.ManyToManyField(
        get_user_model(), editable=False, related_name='topic_users')

    def __str__(self):
        return self.name


class File(models.Model):
    filename = models.FileField(upload_to='uploads/files/')


class Ticket(models.Model):
    class StatusChoices(models.TextChoices):
        OPEN = 'OP', 'Open'
        CLOSED = 'CL', 'Closed'
        PENDING = 'PE', 'Pending'
        RESOLVED = 'RE', 'Resolved'
        EXPIRED = 'EX', 'Expired'

    # Fields
    title = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    expiration = models.DateTimeField()
    status = models.CharField(
        max_length=2, blank=False, choices=StatusChoices.choices, default=StatusChoices.OPEN)
    content = models.TextField()
    uploads = models.ManyToManyField(
        'File', blank=True, related_name='uploads'
    )

    # Foreign keys
    creator = models.ForeignKey(
        get_user_model(), on_delete=models.CASCADE, related_name='creator')
    groups = models.ManyToManyField(Group, related_name='groups')
    receivers = models.ManyToManyField(
        get_user_model(), related_name='receivers')
    comments = models.ManyToManyField(
        'Comment', blank=True, related_name='comments')
    topics = models.ManyToManyField('Topic', related_name='topics')

    def __str__(self):
        return self.title


class Comment(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    creator = models.ForeignKey(
        get_user_model(), on_delete=models.CASCADE, related_name='comment_creator')
    ticket = models.ForeignKey(
        'Ticket', on_delete=models.CASCADE, related_name='comment_ticket')

    def __str__(self):
        return self.title
