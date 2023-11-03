from django.urls import path, include
from .views import (WeatherDataView,
                    WeatherPlaceView
                    )

urlpatterns = [
    path('weather/', WeatherDataView.as_view(), name='weather_data'),
    path('weather/<place>/', WeatherPlaceView.as_view(), name='weather_for_place'),
]