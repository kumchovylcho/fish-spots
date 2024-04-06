from django.urls import path
from . import views

urlpatterns = (
    path("", views.PlacesView.as_view(), name="places"),
    path("create/", views.CreatePlaceView.as_view(), name="create_place"),
    path("delete/<int:pk>/", views.DeletePlaceView.as_view(), name="delete_place"),
    path("suggested-spots/", views.SuggestedSpots.as_view(), name="suggested_spots"),
)
