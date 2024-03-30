# Generated by Django 4.2.6 on 2024-03-30 21:52

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Place',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('place', models.CharField(max_length=50)),
                ('bg_place_name', models.CharField(max_length=50)),
                ('description', models.TextField()),
                ('image', models.ImageField(max_length=255, upload_to='fishing_spot_images/')),
                ('longitude', models.CharField(max_length=30)),
                ('latitude', models.CharField(max_length=30)),
                ('region', models.CharField(max_length=30)),
                ('max_wind_speed', models.IntegerField()),
                ('bad_wind_directions', models.CharField(max_length=255)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('last_modified', models.DateTimeField(auto_now=True)),
                ('creator', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
