from .models import Trader
from .serializers import TraderSerializer
from .serializers import SignUpSerializer
from .serializers import EmailOrUsernameTokenObtainPairSerializer
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from rest_framework.response import Response
from rest_framework import viewsets, permissions
from rest_framework.generics import CreateAPIView
from rest_framework.decorators import action
from rest_framework_simplejwt.views import TokenObtainPairView

class TokenObtainView(TokenObtainPairView):
    serializer_class = EmailOrUsernameTokenObtainPairSerializer
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == 200 and 'access' in response.data:
            access = response.data['access']
            # Set the access token as an HTTP-only cookie
            response.set_cookie(
                key='access_token',
                value=access,
                httponly=True,
                secure=True,  # Set to True in production!
                samesite='None',  # Or 'Strict' if you prefer
                path='/',
                domain='.swopvend.com', 
            )
            # Optionally set refresh token as cookie
            if 'refresh' in response.data:
                refresh = response.data['refresh']
                response.set_cookie(
                    key='refresh_token',
                    value=refresh,
                    httponly=True,
                    secure=True,
                    samesite='None',
                    path='/',
                    domain='.swopvend.com', 
                )
        return response

class TraderViewSet(viewsets.ModelViewSet):
    """
    Provides CRUD for Trader objects.
    """
    queryset = Trader.objects.all().order_by('-date_signed_up')
    serializer_class = TraderSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    @action(detail=False, methods=['get', 'patch'], url_path='me')
    def me(self, request):
        """
        GET  /traders/me/    → retrieve current user
        PATCH /traders/me/   → update current user
        """
        trader = request.user
        if request.method == 'GET':
            serializer = self.get_serializer(trader)
            return Response(serializer.data)
        # PATCH
        serializer = self.get_serializer(trader, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def get_permissions(self):
        # Anyone can list/retrieve; only owners or admin can update/delete
        if self.action in ['update', 'partial_update', 'destroy']:
            return [permissions.IsAuthenticated(), permissions.IsAdminUser()]
        return super().get_permissions()

class SignUpView(CreateAPIView):
    """
    POST /api/signup/
    """
    serializer_class = SignUpSerializer
    permission_classes = []  # allow any
    

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        # Generate tokens
        refresh = RefreshToken.for_user(user)
        
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': serializer.data
        }, status=status.HTTP_201_CREATED)

class LogoutView(APIView):
    def post(self, request):
        refresh_token = request.COOKIES.get('refresh_token')
        if refresh_token:
            try:
                token = RefreshToken(refresh_token)
                token.blacklist()
            except Exception:
                pass  # Ignore if token is invalid or already blacklisted

        response = Response({"detail": "Logged out"}, status=status.HTTP_200_OK)
        # Use the same attributes as set_cookie to ensure deletion works
        response.delete_cookie(
            key='access_token',
            samesite='None',
            path='/'
        )
        response.delete_cookie(
            key='refresh_token',
            samesite='None',
            path='/'
        )
        return response