from django.urls import path
from . import views

urlpatterns = (
    path("", views.PlacesView.as_view(), name="places"),
    path("create/", views.CreatePlaceView.as_view(), name="create_place"),
)
