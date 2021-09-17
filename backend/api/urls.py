from django.urls import path
from . import views

urlpatterns = [
    
    #Ticket
    path('tickets/create/', views.ticketCreate, name="ticket-create"),
    path('tickets/detail/<int:pk>/', views.ticketDetail, name="ticket-detail"),
    path('tickets/list/', views.ticketListReceiver, name="ticket-list"),
    path('tickets/list-creator/<str:pk>', views.ticketListCreator, name="ticket-list-creator"),
    path('tickets/list-groups/<str:pk>',views.ticketListGroup, name="ticket-list-group"),
    path('tickets/receivers-list/<int:pk>', views.ticketReceiversList, name="ticket-receivers-list"),
    path('tickets/update-creator/<int:pk>/', views.ticketCreatorUpdate, name="ticket-creator-update"),
    path('tickets/update-receiver/<int:pk>/', views.ticketReceiverUpdate, name="ticket-receiver-update"),
    path('tickets/update-staff/<int:pk>/', views.ticketStaffUpdate, name="ticket-staff-update"),
    path('tickets/delete/<int:pk>/', views.ticketDelete, name="ticket-delete"),

    #Topic
    path('topics/create/', views.topicCreate, name="topic-create"),
    path('topics/detail/<int:pk>', views.topicDetail, name="topic-detail"),
    path('topics/add-user/<int:pk>', views.topicUserAdd, name="topic-user-add"),
    path('topics/list-group/<int:pk>', views.topicListGroup, name="topic-group-list"),
    path('topics/list-user-group/<int:pk>', views.topicListGroupUser, name="topic-user-group-list"),
    path('topics/list-user-groups/', views.topicListUserAllGroups, name="topic-user-all-groups-list"),
    path('topics/list-not-staff/', views.topicListNotStaff, name="topic-not-user-list"),
    path('topics/user-list/<int:pk>/', views.topicUserList, name="topic-users"),
    path('topics/delete/<int:pk>', views.topicDelete, name="topic-delete"),



    #Comment
    path('comments/create/', views.commentCreate, name="comment-create"),
    path('comments/ticket-list/<int:pk>', views.commentListTicket, name="comment-ticket-list"),
    path('comments/detail/<int:pk>', views.commentDetail, name="comment-detail"),
    path('comments/delete/<int:pk>', views.commentDelete, name="comment-delete"),
]
