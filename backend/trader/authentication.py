from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken

class CookieJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        # Try the Authorization header first (default behavior)
        header = self.get_header(request)
        if header is not None:
            return super().authenticate(request)
        # If not present, try the access_token cookie
        raw_token = request.COOKIES.get('access_token')
        if raw_token is None:
            return None
        try:
            validated_token = self.get_validated_token(raw_token)
        except InvalidToken:
            # Optionally log or handle invalid token
            return None
        return self.get_user(validated_token), validated_token