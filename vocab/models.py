from django.db import models
from user.models import CustomUser

""" class Vocab(models.Model):
    vocab_owner = models.ForeignKey(CustomUser, related_name="vocab_owner", on_delete=models.CASCADE)
    word = models.CharField(max_length=100, null=False, blank=False, unique=True)
    meaning = models.CharField(max_length=557, null=False, blank=False)

    def __str__(self):
        return self.word """

class Word(models.Model):
    owner = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="words")
    word = models.CharField(max_length=100, unique=True, null=False, blank=False)

    def __str__(self):
        return self.word


class Meaning(models.Model):
    word = models.ForeignKey(Word, on_delete=models.CASCADE, related_name="meanings")
    meaning = models.TextField(null=False, blank=False)

    def __str__(self):
        return f"{self.word.word}: {self.meaning}"
