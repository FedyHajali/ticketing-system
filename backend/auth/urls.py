from django.urls import path, include
from auth import views


urlpatterns = [
    path('', include('rest_auth.urls')),
    path('registration/', views.registration, name='registration'),
    path('group-users/<str:pk>/', views.groupUsers, name="group-detail"),

    # rest_auth built-in API

    # auth/login/                   [name='rest_login']
    # auth/logout/                  [name='rest_logout']
    # auth/user/                    [name='rest_user_details']
    # auth/password/change/         [name='rest_password_change']
    # auth/password/reset/          [name='rest_password_reset']
    # auth/password/reset/confirm/  [name='rest_password_reset_confirm']
]
