from django.contrib.auth.models import BaseUserManager
from django.utils.translation import gettext_lazy as _


class CustomUserManager(BaseUserManager):
    """
    Custom user model manager where email is the unique  identifier for authentication
    """

    def create_user(self, email, password, **extra_fields):
        """
        Create and save user with the given email and password
        """
        if not email:
            raise ValueError(_("email must be set"))
        email = self.normalize_email(email.strip())
        user = self.model(email=email, **extra_fields)

        # removing any leading and trailing whitespaces
        user.first_name = user.first_name.strip()
        user.last_name = user.last_name.strip()
        user.university = user.university.strip()
        
        # setting user password
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        """
        Create and save SuperUser with the given email and password
        """
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("SuperUser must have is_staff=True")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("SuperUser must have is_superuser=True")
        return self.create_user(email, password, **extra_fields)
