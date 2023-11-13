from django.urls import path
from .views import CreateLandscape, ListLandscapes, DeleteLandscape

urlpatterns = (
    path('create', CreateLandscape.as_view(), name='create_landscape'),
    path('list', ListLandscapes.as_view(), name='list_landscapes'),
    path('delete/<int:pk>', DeleteLandscape.as_view(), name='delete_landscape'),
)