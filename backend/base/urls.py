from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path("", views.get_routes),

    path("authorize/", views.CheckAuthenticationView.as_view(), name="authorize"),

    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path("logout/", views.LogoutView.as_view(), name='response_logout'),
]
