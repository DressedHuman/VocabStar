from django.db import models
from django.contrib.auth.models import AbstractUser
from phonenumber_field.modelfields import PhoneNumberField
from django.utils.translation import gettext_lazy as _


from .managers import CustomUserManager


# user model
class CustomUser(AbstractUser):
    username = None
    email = models.EmailField(_("email address"), unique=True)
    phone_num = PhoneNumberField(null=False, blank=False)
    university = models.CharField(max_length=157, null=False, blank=False)

    # time related fields
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email
