from django.db import models
from user.models import CustomUser

class Word(models.Model):
    owner = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="words")
    word = models.CharField(max_length=100, null=False, blank=False)

    # time related fields
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ("word", "owner")

    def __str__(self):
        return f"{self.word} - {self.owner}"


class Meaning(models.Model):
    word = models.ForeignKey(Word, on_delete=models.CASCADE, related_name="meanings")
    meaning = models.TextField(null=False, blank=False)

    # time related fields
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.word.word}: {self.meaning}"
