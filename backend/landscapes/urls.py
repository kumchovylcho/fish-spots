from django.urls import path
from .views import CreateLandscape

urlpatterns = (
    path('create', CreateLandscape.as_view(), name='create_landscape'),
)