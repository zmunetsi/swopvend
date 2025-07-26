from rest_framework import serializers
from .models import Trader
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import authenticate
from notification.serializers import NotificationSerializer

class EmailOrUsernameTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    Overrides default to authenticate with email OR username.
    """
    username_field = 'username'  # field name in the request payload

    def validate(self, attrs):
        # Grab the raw values:
        identifier = attrs.get('username')
        password   = attrs.get('password')

        # Attempt authentication using our backends:
        user = authenticate(request=self.context.get('request'),
                            username=identifier, password=password)
        if user is None:
            raise serializers.ValidationError('Invalid credentials')

        # Now that Django has validated, generate the tokens:
        refresh = self.get_token(user)
        return {
            'refresh': str(refresh),
            'access':  str(refresh.access_token),
        }

class TraderSerializer(serializers.ModelSerializer):
    profile_image_public_id = serializers.SerializerMethodField()
    notifications = NotificationSerializer(many=True, read_only=True, source='notifications.all')

    class Meta:
        model = Trader
        fields = [
            'id',
            'username',
            'first_name',
            'last_name',
            'email',
            'phone',
            'city',
            'postcode',
            'country',
            'profile_image',
            'profile_image_public_id',
            'is_email_verified',
            'date_signed_up',
            'notifications',  # <-- add this
        ]
        read_only_fields = ['id', 'is_email_verified', 'date_signed_up']

    def get_profile_image_public_id(self, obj):
        # Ensure obj is a Trader instance and not AnonymousUser
        if not hasattr(obj, 'profile_image'):
            return None
        if obj.profile_image and hasattr(obj.profile_image, 'public_id'):
            return obj.profile_image.public_id
        return None

class SignUpSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = Trader
        fields = [ 'username','email','password','first_name','last_name']

    def create(self, validated_data):
        user = Trader.objects.create_user(
            username   = validated_data['username'],
            email      = validated_data['email'],
            password   = validated_data['password'],
            first_name = validated_data.get('first_name',''),
            last_name  = validated_data.get('last_name','')
        )
        return user