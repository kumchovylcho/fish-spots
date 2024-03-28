from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('base.urls')),
    path('regions/', include('fish_regions.urls')),
    path('places/', include('fish_places.urls')),
    path('profile/', include('users.urls')),
]
