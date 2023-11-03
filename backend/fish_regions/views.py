from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import VarnaRegion, BurgasRegion
from . import helpers
from django.core.cache import cache


class WeatherDataView(APIView):
    http_method_names = ["get"]

    def get(self, request, *args, **kwargs):
        region = request.GET.get("region", "").lower()

        regions = {
            "varna": {"model": VarnaRegion,
                      "places": ["Shabla", "Kranevo", "Varna"]
                      },
            "burgas": {"model": BurgasRegion,
                      "places": ["Burgas", "Chernomorets", "Primorsko"]
                      }
        }

        if not regions.get(region):
            return Response({"message": "Valid regions are varna/burgas."}, status=status.HTTP_400_BAD_REQUEST)
        
        cached_weather = cache.get(region)
        if cached_weather:
            return Response(cached_weather, status=status.HTTP_200_OK)

        regions_data = {}
        for place in regions[region]["places"]:
            data_24h = helpers.get_24h_data(regions[region]["model"], place)
            four_days_data = helpers.get_four_days_data(regions[region]["model"], place)

            regions_data[place.lower()] = {
                "today": data_24h,
                "four_days": four_days_data
            }

        cache.set(region, regions_data, timeout=1 * 60 * 20)  # 20 minutes

        return Response(regions_data, status=status.HTTP_200_OK)


class WeatherPlaceView(APIView):
    http_method_names = ["get"]

    def get(self, request, place, *args, **kwargs):
        region = request.GET.get("region", "").lower()
        place = place.lower()

        if not region or region not in ["varna", "burgas"]:
            return Response({"message": "You must pass a valid region. Example -> varna/burgas"}, status=status.HTTP_400_BAD_REQUEST)
        
        valid_places = ("shabla", "kranevo", "varna", "burgas", "chernomorets", "primorsko")
        if place not in valid_places:
            return Response({"message": f"You must pass a valid place. Example -> {valid_places}"}, status=status.HTTP_400_BAD_REQUEST)

        model = VarnaRegion if region == "varna" else BurgasRegion

        place = place.capitalize()
        data_24h = helpers.get_24h_data(model, place)
        four_days_data = helpers.get_four_days_data(model, place)

        place_data = {
            "today": data_24h,
            "four_days": four_days_data
        }

        return Response(place_data, status=status.HTTP_200_OK)