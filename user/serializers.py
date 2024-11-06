from rest_framework.serializers import ModelSerializer
from .models import CustomUser


class CustomUserSerializer(ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["id", "first_name", "last_name", "phone_num", "university", "email", "password", "date_joined", "updated_at", "last_login"]
        extra_kwargs = {
            "password": {"write_only": True},
            "date_joined": {"read_only": True},
            "updated_at": {"read_only": True},
            "last_login": {"read_only": True},
        }
