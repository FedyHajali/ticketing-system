from django.contrib import admin

# Register your models here.

from .models import Comment, File, Ticket, Topic

admin.site.register(Ticket)
admin.site.register(Topic)
admin.site.register(Comment)
admin.site.register(File)
