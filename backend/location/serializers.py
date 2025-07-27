from rest_framework import serializers
from .models import Country, City

class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = ['id', 'name', 'code']

class CitySerializer(serializers.ModelSerializer):
    country = CountrySerializer(read_only=True)

    class Meta:
        model = City
        fields = ['id', 'name', 'country']