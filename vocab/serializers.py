from rest_framework.serializers import ModelSerializer
from .models import Word, Meaning


""" class VocabSerializer(ModelSerializer):
    class Meta:
        model = Vocab
        fields = ["id", "vocab_owner", "word", "meaning"]
        extra_kwargs = {"vocab_owner": {"write_only": True}} """


class MeaningSerializer(ModelSerializer):
    class Meta:
        model = Meaning
        fields = ["id", "meaning"]
        extra_kwargs = {"id": {"read_only": True}}


class WordSerializer(ModelSerializer):
    meanings = MeaningSerializer(many=True)
    
    class Meta:
        model = Word
        fields = ["id", "owner", "word", "meanings"]
        extra_kwargs = {"owner": {"write_only": True}}
    
    def create(self, validated_data):
        meanings_data = validated_data.pop("meanings")
        word = Word.objects.create(**validated_data)
        for meaning_data in meanings_data:
            Meaning.objects.create(word=word, **meaning_data)
        return word
