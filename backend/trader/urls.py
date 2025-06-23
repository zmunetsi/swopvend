from rest_framework.routers import DefaultRouter
from .views import TraderViewSet, SignUpView, LogoutView, TokenObtainView
from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenBlacklistView,
)


router = DefaultRouter()
router.register(r'traders', TraderViewSet, basename='trader')
urlpatterns = router.urls
urlpatterns += [
    path('auth/signup/', SignUpView.as_view(), name='auth-signup'),
    path('auth/token/',    TokenObtainView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/logout/', LogoutView.as_view(), name='auth_logout'),
]
