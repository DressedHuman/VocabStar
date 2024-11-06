from rest_framework.serializers import ModelSerializer
from rest_framework.exceptions import ValidationError
from .models import Word, Meaning


class MeaningSerializer(ModelSerializer):
    class Meta:
        model = Meaning
        fields = ["id", "meaning"]
        extra_kwargs = {"id": {"read_only": True}}
    

    def validate_meaning(self, value):
        """Ensure meaning is not empty"""
        if not value.strip():
            raise ValidationError("Meaning cannot be empty!")


class WordSerializer(ModelSerializer):
    meanings = MeaningSerializer(many=True)
    
    class Meta:
        model = Word
        fields = ["id", "owner", "word", "meanings", "created_at", "updated_at"]
        extra_kwargs = {"owner": {"write_only": True}}
    
    def create(self, validated_data):
        meanings_data = validated_data.pop("meanings")

        # validate that there is at least one meaning
        if not meanings_data:
            raise ValidationError("A word must have at least one meaning!")
        
        # Create the Word instance
        word = Word.objects.create(owner=validated_data["owner"], word=validated_data["word"].strip().lower())
        meanings = [
            Meaning(word=word, meaning=meaning_data["meaning"].strip()) for meaning_data in meanings_data
        ]
        Meaning.objects.bulk_create(meanings)

        return word
