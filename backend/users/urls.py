from django.urls import path
from .views import (
    UserExistsView,
    EditUserView,
    EditUserPasswordView,
    cookie_consent_view,
)

urlpatterns = (
    path("user-exists/", UserExistsView.as_view()),
    path("edit/<username>", EditUserView.as_view()),
    path("edit-password/<username>", EditUserPasswordView.as_view()),
    path("cookie-consent/", cookie_consent_view),
)
