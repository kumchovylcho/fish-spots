from django.urls import path

from .views import catch_stats, CreateCatchHistory

urlpatterns = (
    path("", catch_stats, name="catch_stats"),
    path("create/", CreateCatchHistory.as_view(), name="create_catch_history"),
)
