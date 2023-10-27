from django.db import models


class Place(models.Model):

    place = models.CharField(max_length=50)

    bg_place_name = models.CharField(max_length=50)

    description = models.TextField()

    image_url = models.TextField()

    longitude = models.CharField(max_length=30)

    latitude = models.CharField(max_length=30)

    region = models.CharField(max_length=30)
