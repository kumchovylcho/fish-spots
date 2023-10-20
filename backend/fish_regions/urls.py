from django.urls import path, include
from .views import (HourlyWeatherDataView, )

urlpatterns = [
    path('24h/', HourlyWeatherDataView.as_view(), name='hourly_weather_data'),
]