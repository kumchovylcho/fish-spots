from rest_framework_simplejwt.authentication import JWTAuthentication

from rest_framework.exceptions import AuthenticationFailed, PermissionDenied
from rest_framework.authentication import CSRFCheck


# def enforce_csrf(request):
#     check = CSRFCheck(request)
#     reason = check.process_view(request, None, (), {})
#     if reason:
#         raise PermissionDenied("CSRF Failed: %s" % reason)


class CustomAuthentication(JWTAuthentication):
    def authenticate(self, request):
        header = self.get_header(request)

        if header is None:
            raw_token = request.COOKIES.get("access_token") or None

        else:
            raw_token = self.get_raw_token(header)

        if raw_token is None:
            raise AuthenticationFailed("Token is expired or it doesn't exist.")

        validated_token = self.get_validated_token(raw_token)
        # enforce_csrf(request)
        return self.get_user(validated_token), validated_token
