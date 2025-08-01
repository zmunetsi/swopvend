from django.contrib.auth.models import AbstractUser
from django.db import models
from cloudinary.models import CloudinaryField
from location.models import Country, City  # <-- import from location app

class Trader(AbstractUser):
    """
    Custom user model for SwopVend, called Trader.
    """
    phone             = models.CharField(max_length=20, blank=True, null=True)
    profile_image     = CloudinaryField(
        'image',
        folder='swopvend/avatars',
        blank=True, null=True
    )
    is_email_verified = models.BooleanField(default=False)
    date_signed_up    = models.DateTimeField(auto_now_add=True)
    country = models.ForeignKey(
        Country,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='traders'
    )
    city = models.ForeignKey(
        City,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='traders'
    )

    def __str__(self):
        return f"{self.first_name} {self.last_name} (@{self.username})"

