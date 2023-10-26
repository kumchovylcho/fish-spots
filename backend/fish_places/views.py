from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from fish_places.models import Place
from fish_places.serializers import PlaceSerializer


class PlacesView(APIView):

    def get(self, request, *args, **kwargs):
        region = request.GET.get("region", "")

        if not region:
            return Response({"message": "Invalid region"}, status=status.HTTP_400_BAD_REQUEST)
        
        region_places = Place.objects.filter(region=region)
        serializer = PlaceSerializer(region_places, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)