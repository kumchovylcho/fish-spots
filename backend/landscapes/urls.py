from django.urls import path
from .views import (CreateLandscape,
                    ListLandscapes, 
                    DeleteLandscape, 
                    EditLandscape
                    )

urlpatterns = (
    path('create', CreateLandscape.as_view(), name='create_landscape'),
    path('list', ListLandscapes.as_view(), name='list_landscapes'),
    path('delete/<int:pk>', DeleteLandscape.as_view(), name='delete_landscape'),
    path('edit/<int:pk>', EditLandscape.as_view(), name='edit_landscape'),
)