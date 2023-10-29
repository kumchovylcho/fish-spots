from rest_framework import serializers
from fish_places.models import Place


class PlaceSerializer(serializers.ModelSerializer):

    bad_wind_directions = serializers.SerializerMethodField()

    class Meta:
        model = Place
        fields = "__all__"

    def get_bad_wind_directions(self, obj):
        return obj.bad_wind_directions.split(", ")