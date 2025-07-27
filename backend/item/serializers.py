# app/serializers.py
from rest_framework import serializers
from .models import Item, ItemImage
from trader.serializers import TraderSerializer
from location.serializers import CitySerializer
from location.models import City

class ItemImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemImage
        fields = ['id', 'image']

class ItemSerializer(serializers.ModelSerializer):
    extra_images = ItemImageSerializer(many=True, read_only=True)
    city = serializers.PrimaryKeyRelatedField(
        queryset=City.objects.all(),
        write_only=True,
        required=False,
        allow_null=True
    )
    city_detail = CitySerializer(source='city', read_only=True)

    class Meta:
        model = Item
        fields = [
            'id',
            'title',
            'status',
            'description',
            'featured_image',
            'category',
            'condition',
            'location',
            'preferred_item',
            'city',         # for writing (ID)
            'city_detail',  # for reading (nested)
            'created_at',
            'updated_at',
            'expires_at',
            'is_archived',
            'extra_images',
            'trader',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at', 'expires_at', 'is_archived', 'extra_images', 'trader']
