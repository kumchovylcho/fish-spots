# Generated by Django 4.2.6 on 2023-10-26 10:00

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Place',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('place', models.CharField(max_length=50)),
                ('description', models.TextField()),
                ('image_url', models.TextField()),
                ('longitude', models.CharField(max_length=30)),
                ('latitude', models.CharField(max_length=30)),
                ('region', models.CharField(max_length=30)),
            ],
        ),
    ]
