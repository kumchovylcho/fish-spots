from .models import Landscape
from rest_framework import serializers
from django.contrib.auth import get_user_model

UserModel = get_user_model()

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ['id', 'username']


class LandscapeListSerializer(serializers.ModelSerializer):
    author = AuthorSerializer()
    created_at = serializers.SerializerMethodField()

    class Meta:
        model = Landscape
        fields = "__all__"

    def get_created_at(self, instance):
        # Format the created_at datetime as dd/mm/yyyy
        return instance.created_at.strftime('%d/%m/%Y')