from rest_framework.serializers import ModelSerializer
from rest_framework.exceptions import ValidationError
from .models import Word, Meaning


class MeaningSerializer(ModelSerializer):
    class Meta:
        model = Meaning
        fields = ["id", "meaning"]
        extra_kwargs = {"id": {"read_only": True}}


class WordSerializer(ModelSerializer):
    class Meta:
        model = Word
        fields = ["id", "owner", "word", "meanings", "created_at", "updated_at"]
        extra_kwargs = {
            "owner": {"write_only": True},
            "meanings": {"read_only": True},
        }
