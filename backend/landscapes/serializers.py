from .models import Landscape
from rest_framework import serializers

class LandscapeListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Landscape
        fields = "__all__"