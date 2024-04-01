from rest_framework import serializers
from fish_places.models import Place


class PlaceSerializer(serializers.ModelSerializer):
    bad_wind_directions = serializers.SerializerMethodField()

    class Meta:
        model = Place
        fields = (
            "place",
            "bg_place_name",
            "description",
            "image",
            "longitude",
            "latitude",
            "region",
            "max_wind_speed",
            "bad_wind_directions",
            "created_at",
            "last_modified",
            "id",
        )

    def get_bad_wind_directions(self, obj):
        return obj.bad_wind_directions.split(", ")


class CreatePlaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Place
        fields = (
            "place",
            "bg_place_name",
            "description",
            "image",
            "longitude",
            "latitude",
            "region",
            "max_wind_speed",
            "bad_wind_directions",
            "creator",
            "id",
        )
