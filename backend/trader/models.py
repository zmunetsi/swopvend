from django.contrib.auth.models import AbstractUser
from django.db import models
from cloudinary.models import CloudinaryField

class Trader(AbstractUser):
    """
    Custom user model for SwopVend, called Trader.
    """
    phone             = models.CharField(max_length=20, blank=True, null=True)
    city              = models.CharField(max_length=100, blank=True, null=True)
    postcode          = models.CharField(max_length=20,  blank=True, null=True)
    country           = models.CharField(max_length=100, blank=True, null=True)
    profile_image     = CloudinaryField(
        'image',
        folder='swopvend/avatars',
        blank=True, null=True
    )
    is_email_verified = models.BooleanField(default=False)
    date_signed_up    = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name} (@{self.username})"

