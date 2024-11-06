# Generated by Django 5.1.2 on 2024-11-06 09:10

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('vocab', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddConstraint(
            model_name='word',
            constraint=models.UniqueConstraint(fields=('owner', 'word'), name='unique_word_per_owner'),
        ),
    ]
