# app/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ItemViewSet, ItemImageViewSet, PublicItemListView

router = DefaultRouter()
# Endpoint for CRUD on items (requires authentication for create/update/delete)
router.register(r'items', ItemViewSet, basename='items')
# Endpoint for managing additional images for items
router.register(r'extra-images', ItemImageViewSet, basename='extra-images')
# Public endpoint for listing available items
router.register(r'public-items', PublicItemListView, basename='public-items')

urlpatterns = [
    # Include all router-generated URLs under /api/
    path('', include(router.urls)),
]
