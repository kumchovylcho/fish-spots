from django.urls import path
from .views import (UserExistsView, 
                    EditUserView,
                    EditUserPasswordView,
                    )

urlpatterns = (
    path("user-exists/", UserExistsView.as_view()),
    path("edit/<username>", EditUserView.as_view()),
    path("edit-password/<username>", EditUserPasswordView.as_view()),
)