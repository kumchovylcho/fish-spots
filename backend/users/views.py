from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.generics import RetrieveUpdateAPIView

from .serializers import UserExistsData, EditUserSerializer
from base.utils import set_token_in_cookie

from django.contrib.auth.hashers import check_password
from django.contrib.auth import get_user_model


UserModel = get_user_model()


class UserExistsView(APIView):
    def post(self, request):
        username = request.data.get("username", "")
        old_username = request.data.get("old_username", "")
        password = request.data.get("password", "")
        use_password = request.data.get("check_password", False)

        try:
            user = UserModel.objects.get(username=username)

            serializer = UserExistsData(user, many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except UserModel.DoesNotExist:
            if not use_password:
                return Response({"msg": "not found"}, status=status.HTTP_404_NOT_FOUND)

            user = UserModel.objects.get(username=old_username)
            if not check_password(password, user.password):
                return Response(
                    {"msg": "wrong password"}, status=status.HTTP_401_UNAUTHORIZED
                )

            return Response(
                {"msg": "correct password"}, status=status.HTTP_202_ACCEPTED
            )


class EditUserView(RetrieveUpdateAPIView):
    queryset = UserModel.objects.all()
    serializer_class = EditUserSerializer
    lookup_field = "username"


class EditUserPasswordView(RetrieveUpdateAPIView):
    queryset = UserModel.objects.all()
    lookup_field = "username"

    def update(self, request, *args, **kwargs):
        instance = self.get_object()

        old_password = request.data.get("old_password", "")
        new_password = request.data.get("new_password", "")
        confirm_password = request.data.get("confirm_password", "")

        if old_password and new_password and confirm_password:
            if not instance.check_password(old_password):
                return Response(
                    {"error": "Грешна стара парола."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            if new_password != confirm_password:
                return Response(
                    {"error": "Новите пароли не съвпадат."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            instance.set_password(new_password)
            instance.save()
            return Response(
                {"message": "Успешно сменихте паролата!"}, status=status.HTTP_200_OK
            )

        return Response(
            {"error": "Моля попълнете всички полета."},
            status=status.HTTP_400_BAD_REQUEST,
        )


@api_view(["GET", "POST"])
def cookie_consent_view(request):
    if request.method == "GET":
        try:
            cookie_consent = int(request.COOKIES.get("cf", 0)) == 1
        except ValueError as ve:
            print(ve)
            cookie_consent = False

        has_user_decided = None if not request.COOKIES.get("cf") else cookie_consent
        return Response(
            {
                "consent": has_user_decided,
            },
            status=status.HTTP_200_OK,
        )

    if request.method == "POST":
        consent = request.data.get("consent", False) == True
        response = Response({"consent": consent}, status=status.HTTP_200_OK)

        cookie_value = 0 if not consent else 1
        one_year = 365 * 24 * 60 * 60
        response = set_token_in_cookie(response, "cf", cookie_value, one_year)

        return response
