from django.contrib import admin
from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView
)
from trader.views import SignUpView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('trader.urls')),
    path('api/', include('item.urls')),
    path('api/', include('swap.urls')),
    path('api/', include('contact_message.urls')),
    path('api/', include('item_interest.urls')),
    path('api/', include('notification.urls')),
    path('api/', include('location.urls')),  # <-- Add this line
    path('auth/signup/', SignUpView.as_view(), name='auth-signup'),
    path('api/auth/', include('dj_rest_auth.urls')),
    # OpenAPI schema
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),

    # Swagger UI:
    path('api/schema/swagger-ui/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    # (Optional) ReDoc UI:
    path('api/schema/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)