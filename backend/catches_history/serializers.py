from rest_framework import serializers
from .models import CatchHistory


class CatchHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = CatchHistory
        fields = (
            "id",
            "date",
            "city",
            "fish_spot",
            "fish_type",
            "quantity",
            "lure_type",
            "from_hour",
            "to_hour",
            "snaps",
            "good_weather",
        )
