from django.urls import path
from . import views

urlpatterns = [
    path('', views.apiOverview, name="api-overview"),
    path('ticket-list/', views.ticketList, name="ticket-list"),
    path('ticket-list-dest/<str:pk>', views.ticketDestinationList,
         name="ticket-destination-list"),
    path('ticket-list-group/<str:pk>',
         views.ticketGroupList, name="ticket-group-list"),
    path('ticket-detail/<int:pk>/', views.ticketDetail, name="ticket-detail"),
    path('ticket-update/<int:pk>/', views.ticketUpdate, name="ticket-update"),
    path('ticket-delete/<int:pk>/', views.ticketDelete, name="ticket-delete"),
    path('ticket-create/', views.ticketCreate, name="ticket-create")
]
