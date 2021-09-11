from django.urls import path
from . import views

urlpatterns = [
    #Overview Api
    path('', views.apiOverview, name="api-overview"),

    

    #Ticket
    path('ticket-create/', views.ticketCreate, name="ticket-create"),
    path('ticket-list/', views.ticketList, name="ticket-list"),
    path('ticket-receivers-list/<str:pk>', views.ticketReceiversList, name="ticket-receivers-list"),
    path('ticket-list-creator/<str:pk>', views.ticketListCreator, name="ticket-list-creator"),
    path('ticket-list-group/<str:pk>',views.ticketGroupList, name="ticket-group-list"),
    path('ticket-detail/<int:pk>/', views.ticketDetail, name="ticket-detail"),
    path('ticket-creator-update/<int:pk>/', views.ticketCreatorUpdate, name="ticket-creator-update"),
    path('ticket-receiver-update/<int:pk>/', views.ticketReceiverUpdate, name="ticket-receiver-update"),
    path('ticket-staff-update/<int:pk>/', views.ticketStaffUpdate, name="ticket-staff-update"),
    path('ticket-delete/<int:pk>/', views.ticketDelete, name="ticket-delete"),

    #Topic
    path('topic-create/', views.topicCreate, name="topic-create"),
    path('topic-detail/<int:pk>', views.topicDetail, name="topic-detail"),
    path('topic-user-add/<int:pk>', views.topicUsersAdd, name="topic-user-add"),
    path('topic-group-list/<str:pk>', views.topicGroupList, name="topic-group-list"),
    path('topic-users/<int:pk>/', views.topicUsers, name="topic-users"),
    path('topic-user-group-list/', views.topicUserGroupList, name="topic-user-group-list"),
    path('topic-not-staff-list/', views.topicNotStaffList, name="topic-not-user-list"),
    path('topic-user-list/', views.topicUserList, name="topic-user-list"),
    path('topic-user/<str:pk>', views.topicUsers, name="topic-user"),



    #Comment
    path('comment-create/', views.commentCreate, name="comment-create"),
    path('comment-detail/<int:pk>', views.commentDetail, name="comment-detail"),
    
]
