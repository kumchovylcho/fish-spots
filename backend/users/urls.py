from django.urls import path
from .views import (UserExistsView, 
                    EditUserView
                    )

urlpatterns = (
    path("user-exists/", UserExistsView.as_view()),
    path("edit/<username>", EditUserView.as_view()),
)