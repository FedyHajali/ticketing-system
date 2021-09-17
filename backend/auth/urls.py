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
    path('groups/user-list/<int:pk>/', views.userListGroup, name="group-users"),
    path('groups/delete/<int:pk>', views.groupDelete, name="group-delete"),

    # rest_auth built-in API

    # auth/login/                   [name='rest_login']
    # auth/logout/                  [name='rest_logout']
    # auth/user/                    [name='rest_user_details']
    # auth/password/change/         [name='rest_password_change']
    # auth/password/reset/          [name='rest_password_reset']
    # auth/password/reset/confirm/  [name='rest_password_reset_confirm']
]
