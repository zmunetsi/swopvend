from django.urls import path
from .views import (
    ItemInterestCreateView,
    MyItemInterestListView,
    ItemInterestDeleteView
)

urlpatterns = [
    path('item-interest/interest/', ItemInterestCreateView.as_view(), name='item-interest-create'),
    path('item-interest/my-interests/', MyItemInterestListView.as_view(), name='item-interest-list'),
    path('item-interest/interest/remove/', ItemInterestDeleteView.as_view(), name='item-interest-delete'),
]

