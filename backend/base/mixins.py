from rest_framework.test import APIRequestFactory
from rest_framework_simplejwt.views import TokenRefreshView

from django.conf import settings
from django.contrib.auth import get_user_model

from jwt import decode

from base.utils import set_token_in_cookie
from users.backends import CustomAuthentication


UserModel = get_user_model()


class AuthorizedMixin:
    """
    The frontend must send (credentials: "include") so that this mixin can read the cookies.
    Otherwise you will be always unauthorized.
    """
    authentication_classes = [CustomAuthentication]

    def dispatch(self, request, *args, **kwargs):
        response = super().dispatch(request, *args, **kwargs)

        # unauthorized request (access token is expired or cookie doesn't exist)
        if response.status_code == 401:

            refresh_token = request.COOKIES.get("refresh_token")
            if not refresh_token or refresh_token == "None":
                return response

            payload = decode(refresh_token, settings.SIMPLE_JWT.get(
                "SIGNING_KEY"), algorithms=[settings.SIMPLE_JWT.get("ALGORITHM")])
            if not payload:
                return response

            user = UserModel.objects.filter(
                pk=payload.get("user_id", "")).first()
            if not user or not user.is_superuser:
                return response

            factory = APIRequestFactory()
            factory_request = factory.post(
                "/api/token/refresh", {"refresh": refresh_token})
            factory_response = TokenRefreshView.as_view()(factory_request)

            one_month = 3600 * 24 * 30
            response = set_token_in_cookie(
                response, "access_token", str(factory_response.data.get("access", "")), one_month)
            response = set_token_in_cookie(
                response, "refresh_token", str(factory_response.data.get("refresh", "")), one_month)

        return response
