from rest_framework import serializers
from django.contrib.auth import get_user_model


UserModel = get_user_model()


class BaseUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserModel
        fields = "__all__"


class UserExistsData(BaseUserSerializer):
    number_of_created_landscapes = serializers.SerializerMethodField()

    class Meta:
        model = UserModel
        fields = ("username", "email", "number_of_created_landscapes")

    def get_number_of_created_landscapes(self, user):
        return 0


class EditUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserModel
        fields = ("username", "email", "password")
