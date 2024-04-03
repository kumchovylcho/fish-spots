from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import DestroyAPIView

from .models import Place
from .serializers import PlaceSerializer, CreatePlaceSerializer
from base.mixins import AuthorizedMixin


class PlacesView(APIView):

    def get(self, request, *args, **kwargs):
        region = request.GET.get("region", "").lower()

        if not region:
            return Response(
                {"message": "Invalid region. You must provide `region` parameter."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        region_places = Place.objects.filter(region=region)
        serializer = PlaceSerializer(
            region_places, context={"request": request}, many=True
        )

        return Response(serializer.data, status=status.HTTP_200_OK)


class CreatePlaceView(AuthorizedMixin, APIView):

    def post(self, request, *args, **kwargs):
        serializer = CreatePlaceSerializer(
            data=request.data, context={"request": request}
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DeletePlaceView(AuthorizedMixin, DestroyAPIView):
    queryset = Place.objects.all()
