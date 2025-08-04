# app/serializers.py
from rest_framework import serializers
from .models import Item, ItemImage
from trader.serializers import TraderSerializer
from location.serializers import CitySerializer, CountrySerializer
from location.models import City, Country

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
    featured_image = serializers.ImageField(required=False, allow_null=True)
    featured_image_url = serializers.CharField(source='featured_image.url', read_only=True)
    featured_image_public_id = serializers.CharField(source='featured_image.public_id', read_only=True)
    trader = TraderSerializer(read_only=True)
    city = serializers.PrimaryKeyRelatedField(
        queryset=City.objects.all(),
        write_only=True,
        required=True,
        allow_null=False
    )
    city_detail = CitySerializer(source='city', read_only=True)
    country = serializers.PrimaryKeyRelatedField(
        queryset=Country.objects.all(),
        write_only=True,
        required=True,
        allow_null=False
    )
    country_detail = CountrySerializer(source='country', read_only=True)

    class Meta:
        model = Item
        fields = [
            'id', 'slug', 'title', 'preferred_item', 'description',
            'featured_image', 'featured_image_url',
            'featured_image_public_id', 'category', 'condition', 'status', 'is_archived', 'extra_images',
            'uploaded_images', 'trader', 'city', 'city_detail', 'country', 'country_detail',
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
            'country_detail',
        ]

    def create(self, validated_data):
        uploaded_images = validated_data.pop('uploaded_images', [])
        city = validated_data.pop('city')
        country = validated_data.pop('country')
        # Enforce featured_image required on create
        if not validated_data.get('featured_image'):
            raise serializers.ValidationError({'featured_image': 'This field is required.'})
        item = Item.objects.create(city=city, country=country, **validated_data)
        for image in uploaded_images:
            ItemImage.objects.create(item=item, image=image)
        return item

    def update(self, instance, validated_data):
        uploaded_images = validated_data.pop('uploaded_images', [])
        city = validated_data.pop('city', None)
        country = validated_data.pop('country', None)
        featured_image = validated_data.pop('featured_image', None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if city is not None:
            instance.city = city
        if country is not None:
            instance.country = country
        # Only update featured_image if provided
        if featured_image is not None:
            instance.featured_image = featured_image
        instance.save()
        for image in uploaded_images:
            ItemImage.objects.create(item=instance, image=image)
        return instance
