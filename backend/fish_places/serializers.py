from rest_framework import serializers

from fish_places.models import Place
from .utils import generate_errors_messages


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

        extra_kwargs = {
            "place": generate_errors_messages("Place", required=True, blank=True),
            "bg_place_name": generate_errors_messages(
                "BG Place Name", required=True, blank=True
            ),
            "description": generate_errors_messages(
                "Description", required=True, blank=True
            ),
            "image": generate_errors_messages(
                "Image", required=True, blank=True, invalid=True
            ),
            "longitude": generate_errors_messages(
                "Longitude", required=True, blank=True
            ),
            "latitude": generate_errors_messages("Latitude", required=True, blank=True),
            "region": generate_errors_messages("Region", required=True, blank=True),
            "bad_wind_directions": generate_errors_messages(
                "Bad Wind Directions", required=True, blank=True
            ),
            "max_wind_speed": generate_errors_messages(
                "Max Wind Speed", required=True, blank=True, invalid=True
            ),
        }
