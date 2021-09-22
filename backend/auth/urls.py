from django.urls import path, include
from auth import views


urlpatterns = [
    path('', include('rest_auth.urls')),

    # User
    path('users/registration/', views.registration, name='registration'),
    path('users/detail/', views.userDetail, name="user-detail"),

    # Group
    path('groups/list/', views.groupList, name="group-list"),
    path('groups/list-user/', views.groupListUser, name="user-group-list"),
    path('groups/create/', views.groupCreate, name="group-create"),
    path('groups/user-list/<int:group_id>/', views.userListGroup, name="group-users"),
    path('groups/delete/<int:group_id>', views.groupDelete, name="group-delete"),
    path('groups/add-user/<int:group_id>', views.groupUserAdd, name="group-user-add"),
    path('groups/delete-user/<int:group_id>', views.groupUserDelete, name="group-user-remove"),

    # rest_auth built-in API

    # auth/login/                   [name='rest_login']
    # auth/logout/                  [name='rest_logout']
    # auth/user/                    [name='rest_user_details']
    # auth/password/change/         [name='rest_password_change']
    # auth/password/reset/          [name='rest_password_reset']
    # auth/password/reset/confirm/  [name='rest_password_reset_confirm']
]
