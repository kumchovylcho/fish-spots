from django.urls import path, include
from .views import (WeatherDataView, )

urlpatterns = [
    path('weather/', WeatherDataView.as_view(), name='weather_data'),
]