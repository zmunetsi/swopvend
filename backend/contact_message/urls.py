from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ContactMessageViewSet

router = DefaultRouter()
router.register(r'contact-messages', ContactMessageViewSet, basename='contact-messages')

urlpatterns = [
    path('', include(router.urls)),
]