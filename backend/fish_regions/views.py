from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import VarnaRegion, BurgasRegion
from . import helpers
from django.core.cache import cache


cache_key = "weather_cache"


class WeatherDataView(APIView):
    http_method_names = ["get"]

    def get(self, request, *args, **kwargs):
        cached_weather = cache.get(cache_key)

        if cached_weather:
            return Response(cached_weather, status=status.HTTP_200_OK)

        regions = {
            "varna": {"model": VarnaRegion,
                      "places": ["Shabla", "Kranevo", "Varna"]
                      },
            "burgas": {"model": BurgasRegion,
                      "places": ["Burgas", "Chernomorets", "Primorsko"]
                      }
        }

        regions_data = {}

        for region, data in regions.items():
            model = data["model"]

            regions_data[region] = {}
            for place in data["places"]:
                data_24h = helpers.get_24h_data(model, place)
                four_days_data = helpers.get_four_days_data(model, place)

                regions_data[region][place.lower()] = {
                    "today": data_24h,
                    "four_days": four_days_data
                }

        cache.set(cache_key, regions_data, timeout=1 * 60 * 60 * 3)  # 3 hours

        return Response(regions_data, status=status.HTTP_200_OK)
