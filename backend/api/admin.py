from django.contrib import admin

# Register your models here.

from .models import Comment, Ticket, Topic


@admin.register(Ticket)
class TicketAdmin(admin.ModelAdmin):
    list_filter = ('last_updated_by', 'groups')
    list_display = ("title", "status", "expiration",
                    "creator", "last_updated_by")
    search_fields = ("title__startswith", )


# admin.site.register(Ticket)
admin.site.register(Topic)
admin.site.register(Comment)
