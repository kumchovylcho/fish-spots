from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.views import APIView

from django.conf import settings

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import MyTokenObtainPairSerializer, RegistrationSerializer
from .utils import set_token_in_cookie

from jwt import decode


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

    def finalize_response(self, request, response, *args, **kwargs):
        if request.method == "POST":
            one_month = 3600 * 24 * 30
            response = set_token_in_cookie(
                response, "access_token", str(response.data.get("access", "")), one_month)
            response = set_token_in_cookie(
                response, "refresh_token", str(response.data.get("refresh", "")), one_month)

            payload = decode(str(response.data.get("access")),
                             settings.SIMPLE_JWT.get("SIGNING_KEY"),
                             algorithms=[settings.SIMPLE_JWT.get("ALGORITHM")]
                             )

            response.data = {}
            response.data["username"] = payload.get("username", "")

        return super().finalize_response(request, response, *args, **kwargs)


@api_view(["GET", ])
def get_routes(request):
    routes = [
        'token/',
        'token/refresh',
    ]

    return Response(routes)


class RegistrationView(APIView):
    http_method_names = ["post"]

    def post(self, request):
        serializer = RegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()

            response = {"message": "Успешна регистрация!",
                        "username": user.username,
                        }

            return Response(response, status=status.HTTP_201_CREATED)

        return Response({"errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
    http_method_names = ["post"]

    def post(self, request):
        try:
            refresh_token = request.data["refreshToken"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"message": "Successfully logged out"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"message": "Unable to log out"}, status=status.HTTP_400_BAD_REQUEST)
