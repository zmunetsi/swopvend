from django.shortcuts import render
from rest_framework import viewsets
from .models import Country, City
from .serializers import CountrySerializer, CitySerializer

class CountryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Country.objects.all().order_by('name')
    serializer_class = CountrySerializer

class CityViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = City.objects.select_related('country').order_by('name')
    serializer_class = CitySerializer

# Create your views here.
