# app/serializers.py
from rest_framework import serializers
from .models import Item, ItemImage
from trader.serializers import TraderSerializer
from location.serializers import CitySerializer
from location.models import City

class ItemImageSerializer(serializers.ModelSerializer):
    
    """
    Serializer for individual item images, including Cloudinary public ID and URL.
    """
    image_public_id = serializers.CharField(
        source='image.public_id',
        read_only=True
    )
    image_url = serializers.CharField(
        source='image.url',
        read_only=True
    )

    class Meta:
        model = ItemImage
        fields = [
            'id',
            'image',
            'image_public_id',
            'image_url',
        ]
        read_only_fields = [
            'id',
            'image_public_id',
            'image_url',
        ]

class ItemSerializer(serializers.ModelSerializer):
    extra_images = ItemImageSerializer(many=True, read_only=True)
    uploaded_images = serializers.ListField(
        child=serializers.ImageField(), write_only=True, required=False
    )
    featured_image_url = serializers.CharField(source='featured_image.url', read_only=True)
    featured_image_public_id = serializers.CharField(source='featured_image.public_id', read_only=True)
    trader = TraderSerializer(read_only=True)
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
            'id', 'title', 'preferred_item', 'description',
            'featured_image', 'featured_image_url',
            'featured_image_public_id', 'category', 'condition', 'status', 'is_archived', 'extra_images',
            'uploaded_images', 'trader', 'city', 'city_detail',
            'created_at',
        ]
        read_only_fields = [
            'id',
            'trader',
            'featured_image_public_id',
            'featured_image_url',
            'extra_images',
            'created_at',
            'city_detail',
        ]

    def create(self, validated_data):
        uploaded_images = validated_data.pop('uploaded_images', [])
        city = validated_data.pop('city', None)
        item = Item.objects.create(**validated_data)
        if city:
            item.city = city
            item.save()
        for image in uploaded_images:
            ItemImage.objects.create(item=item, image=image)
        return item
