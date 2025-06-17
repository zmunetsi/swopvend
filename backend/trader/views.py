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