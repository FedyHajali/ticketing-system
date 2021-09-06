from django.urls import path, include
from auth import views
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('registration/', views.registration, name='registration'),
    path('api-auth/', include('rest_framework.urls')),
]
