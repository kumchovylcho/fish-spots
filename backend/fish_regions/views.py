from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import VarnaRegion, BurgasRegion
from . import helpers


class WeatherDataView(APIView):
    http_method_names = ["get"]

    def get(self, request, *args, **kwargs):
        region = request.GET.get("region", "").lower()
        place = request.GET.get("place", "").lower().capitalize()

        regions = {
            "north": {"model": VarnaRegion,
                      "places": ["Shabla", "Kranevo", "Varna"]
                      },
            "south": {"model": BurgasRegion,
                      "places": ["Burgas", "Chernomorets", "Primorsko"]
                      }
        }

        response = {}

        if region not in regions:
            response["region_msg"] = f"{region} region is invalid. Valid regions are 'north' or 'south'"

        if region in regions and place not in regions[region]["places"]:
            response["place_msg"] = f"{place} place is invalid. Valid places for `{region}` are {regions[region]['places']}"

        if response:
            response["example_url"] = "Example usage www.example.com/regions/weather/?region=north&place=Varna"
            return Response(response, status=status.HTTP_404_NOT_FOUND)

        model = regions[region]["model"]

        data_24h = helpers.get_24h_data(model, place)

        return Response(data_24h, status=status.HTTP_200_OK)
