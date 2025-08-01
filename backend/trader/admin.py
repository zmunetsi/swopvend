from django.contrib import admin
from .models import Trader

@admin.register(Trader)
class TraderAdmin(admin.ModelAdmin):
    list_display = ('id', 'first_name', 'last_name', 'email', 'country', 'city')  # Adjust fields as per your Trader model