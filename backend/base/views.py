from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.views import APIView

from django.conf import settings

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import MyTokenObtainPairSerializer
from .utils import set_token_in_cookie
from users.backends import CustomAuthentication

from jwt import decode


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

    def finalize_response(self, request, response, *args, **kwargs):
        response = super().finalize_response(request, response, *args, **kwargs)

        if request.method == "POST" and response.status_code == 200:
            one_month = 3600 * 24 * 30
            response = set_token_in_cookie(
                response,
                "access_token",
                str(response.data.get("access", "")),
                one_month,
            )
            response = set_token_in_cookie(
                response,
                "refresh_token",
                str(response.data.get("refresh", "")),
                one_month,
            )

            payload = decode(
                str(response.data.get("access")),
                settings.SIMPLE_JWT.get("SIGNING_KEY"),
                algorithms=[settings.SIMPLE_JWT.get("ALGORITHM")],
            )

            response.data = {}
            response.data["user"] = payload.get("username", "")
            response.data["id"] = payload.get("user_id", "")

        return response


@api_view(
    [
        "GET",
    ]
)
def get_routes(request):
    routes = ["token/", "token/refresh/", "authorize/", "logout/"]

    return Response(routes)


class LogoutView(APIView):
    http_method_names = ["post"]

    def post(self, request):
        try:
            refresh_token = request.COOKIES.get("refresh_token")
            token = RefreshToken(refresh_token)
            token.blacklist()

            response = Response(
                {"message": "Successfully logged out"}, status=status.HTTP_200_OK
            )
            response = set_token_in_cookie(response, "access_token", "", 0)
            response = set_token_in_cookie(response, "refresh_token", "", 0)

            return response
        except Exception as e:
            return Response(
                {"message": "Unable to log out"}, status=status.HTTP_400_BAD_REQUEST
            )


class CheckAuthenticationView(APIView):
    authentication_classes = [CustomAuthentication]

    def get(self, request):
        return Response(
            {"msg": "Logged.", "user": request.user.username, "id": request.user.pk}
        )
