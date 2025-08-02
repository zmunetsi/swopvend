from django.db import models
from django.utils.text import slugify
from django.conf import settings
import uuid

# Create your models here.

class Country(models.Model):
    name = models.CharField(max_length=100, unique=True)
    code = models.CharField(max_length=3, unique=True)  # e.g. 'US', 'ZW'
    slug = models.SlugField(max_length=120, blank=True)

    def save(self, *args, **kwargs):
        if not self.slug or slugify(self.name) not in self.slug:
            base_slug = slugify(self.name)
            unique_slug = base_slug
            while Country.objects.filter(slug=unique_slug).exclude(pk=self.pk).exists():
                unique_slug = f"{base_slug}-{uuid.uuid4().hex[:6]}"
            self.slug = unique_slug
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

class City(models.Model):
    name = models.CharField(max_length=100)
    country = models.ForeignKey(Country, related_name='cities', on_delete=models.CASCADE)
    slug = models.SlugField(max_length=120, blank=True)

    class Meta:
        unique_together = ('name', 'country')

    def save(self, *args, **kwargs):
        if not self.slug or slugify(self.name) not in self.slug:
            base_slug = slugify(self.name)
            unique_slug = base_slug
            while City.objects.filter(slug=unique_slug).exclude(pk=self.pk).exists():
                unique_slug = f"{base_slug}-{uuid.uuid4().hex[:6]}"
            self.slug = unique_slug
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.name}, {self.country.code}"

class Trader(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='trader_profile')
    display_name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=120, blank=True)

    def save(self, *args, **kwargs):
        if not self.slug or slugify(self.display_name) not in self.slug:
            base_slug = slugify(self.display_name)
            unique_slug = base_slug
            while Trader.objects.filter(slug=unique_slug).exclude(pk=self.pk).exists():
                unique_slug = f"{base_slug}-{uuid.uuid4().hex[:6]}"
            self.slug = unique_slug
        super().save(*args, **kwargs)

    def __str__(self):
        return self.display_name
