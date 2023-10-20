from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import VarnaRegion, BurgasRegion
from . import helpers


class HourlyWeatherDataView(APIView):
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
            response["example_url"] = "Example usage www.example.com/regions/24h/?region=north&place=Varna"
            return Response(response, status=status.HTTP_404_NOT_FOUND)


        model = regions[region.lower()]["model"]

        today_date = helpers.get_today_date()
        place_objects = model.objects.filter(city_name=place,
                                             date=today_date
                                            ) \
                                            .order_by('time')
        

        response["day_of_week"] = helpers.get_day_of_week(today_date)
        response["today_date"] = today_date
        response["bg_name_place"] = helpers.english_to_bulgarian_places(place)
        response["sunrise"] = place_objects[0].sunrise
        response["sunset"] = place_objects[0].sunset
        response["list_hours"] = []
        
        for place in place_objects:
            curr_hour = {
                "time": place.time,
                "feels_like": place.feels_like,
                "normal_temp": place.normal_temperature,
                "min_temp": place.min_temperature,
                "max_temp": place.max_temperature,
                "weather_icon_url": place.weather_icon_url,
                "wind_direction": place.wind_direction,
                "wind_speed": place.wind_speed
            }

            response["list_hours"].append(curr_hour)
        

        return Response(response, status=status.HTTP_200_OK)
