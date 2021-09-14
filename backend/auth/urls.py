from django.urls import path, include
from auth import views


urlpatterns = [
    path('', include('rest_auth.urls')),

    # User
    path('registration/', views.registration, name='registration'),
    path('user-detail/', views.userDetail, name="user-detail"),

    # Group
    path('group-list/', views.groupList, name="group-list"),
    path('group-create/', views.groupCreate, name="group-create"),
    path('group-users/<int:pk>/', views.groupUsers, name="group-users"),

    # rest_auth built-in API

    # auth/login/                   [name='rest_login']
    # auth/logout/                  [name='rest_logout']
    # auth/user/                    [name='rest_user_details']
    # auth/password/change/         [name='rest_password_change']
    # auth/password/reset/          [name='rest_password_reset']
    # auth/password/reset/confirm/  [name='rest_password_reset_confirm']
]
