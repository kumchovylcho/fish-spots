from django.urls import path
from .views import CreateLandscape, ListLandscapes

urlpatterns = (
    path('create', CreateLandscape.as_view(), name='create_landscape'),
    path('list', ListLandscapes.as_view(), name='list_landscapes'),
)