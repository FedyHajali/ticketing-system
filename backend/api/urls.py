from django.urls import path
from . import views

urlpatterns = [
    
    #Ticket
    path('tickets/create/', views.ticketCreate, name="ticket-create"),
    path('tickets/detail/<int:ticket_id>/', views.ticketDetail, name="ticket-detail"),
    path('tickets/list-receiver/', views.ticketListReceiver, name="ticket-list"),
    path('tickets/list-creator/<str:creator_id>', views.ticketListCreator, name="ticket-list-creator"),
    path('tickets/list-all/', views.ticketListAll, name="ticket-list-all"),
    path('tickets/list-groups/<str:group_id>',views.ticketListGroup, name="ticket-list-group"),         #not used
    path('tickets/list-topic/<int:topic_id>/',views.ticketListTopic, name="ticket-list-topic"),         #not used
    path('tickets/list-topic-user/<int:topic_id>/',views.ticketListTopicUser, name="ticket-list-topic-user"),
    path('tickets/all-topics-users/<int:ticket_id>/', views.ticketAllTopicsUsers, name="ticket-alltopicsusers"),
    path('tickets/receivers-list/<int:ticket_id>', views.ticketReceiversList, name="ticket-receivers-list"),        #not used
    path('tickets/update-creator/<int:ticket_id>/', views.ticketCreatorUpdate, name="ticket-creator-update"),
    path('tickets/update-receiver/<int:ticket_id>/', views.ticketReceiverUpdate, name="ticket-receiver-update"),
    path('tickets/update-staff/<int:ticket_id>/', views.ticketStaffUpdate, name="ticket-staff-update"),
    path('tickets/user-add/<int:ticket_id>/<int:user_id>', views.ticketUserAdd, name="ticket-user-add"),
    path('tickets/delete/<int:ticket_id>/', views.ticketDelete, name="ticket-delete"),

    #Topic
    path('topics/create/', views.topicCreate, name="topic-create"),
    path('topics/detail/<int:topic_id>', views.topicDetail, name="topic-detail"),
    path('topics/add-user/<int:topic_id>', views.topicUserAdd, name="topic-user-add"),
    path('topics/delete-user/<int:topic_id>', views.topicUserDelete, name="topic-user-remove"),
    path('topics/list-group/<int:group_id>', views.topicListGroup, name="topic-group-list"),
    path('topics/list-user-group/<int:group_id>', views.topicListGroupUser, name="topic-user-group-list"),
    path('topics/list-user-groups/', views.topicListUserAllGroups, name="topic-user-all-groups-list"),      #not used
    path('topics/list-not-staff/', views.topicListNotStaff, name="topic-not-user-list"),        #not used
    path('topics/user-list/<int:topic_id>/', views.topicUserList, name="topic-users"), 
    path('topics/delete/<int:topic_id>', views.topicDelete, name="topic-delete"),



    #Comment
    path('comments/create/', views.commentCreate, name="comment-create"),
    path('comments/delete/<int:comment_id>', views.commentDelete, name="comment-delete"),
    path('comments/ticket-list/<int:ticket_id>', views.commentListTicket, name="comment-ticket-list"),      #not used
    path('comments/detail/<int:comment_id>', views.commentDetail, name="comment-detail"),       #not used
]
