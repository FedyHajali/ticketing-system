from django.contrib import admin

# Register your models here.

from .models import Comment, Ticket, Topic

admin.site.register(Ticket)
admin.site.register(Topic)
admin.site.register(Comment)
