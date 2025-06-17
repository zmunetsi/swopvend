# swap/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SwapRequestViewSet, SwapMessageViewSet

# 1. Base router for SwapRequest
router = DefaultRouter()
router.register(r'swaps', SwapRequestViewSet, basename='swap-requests')

# 2. SwapMessage endpoints handlers (without rest_framework_nested)
swap_message_list = SwapMessageViewSet.as_view({
    'get': 'list',
    'post': 'create'
})
swap_message_detail = SwapMessageViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})

# 3. URL patterns for the swap app
urlpatterns = [
    # SwapRequest endpoints: /api/swaps/ …
    path('', include(router.urls)),

    # SwapMessage endpoints without nested router:
    path('swaps/<int:swap_pk>/messages/', swap_message_list, name='swap-messages-list'),
    path('swaps/<int:swap_pk>/messages/<int:pk>/', swap_message_detail, name='swap-messages-detail'),
]
