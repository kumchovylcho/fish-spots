from django.urls import path
from . import views

urlpatterns = (
    path('', views.PlacesView.as_view(), name='places'),
)