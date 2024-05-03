from django.db import models

import os

from .utils import image_directory_distributor


class Seller(models.Model):
    name = models.CharField(max_length=100, null=False, blank=False)
    contact = models.CharField(max_length=200, null=False, blank=False)

    def __str__(self):
        return self.name


class ChepareImages(models.Model):
    CHEPARE_TYPES = (
        ("safrid", "safrid"),
        ("karagioz", "karagioz"),
        ("chernokop", "chernokop"),
        ("palamud", "palamud"),
    )

    seller = models.ForeignKey(Seller, on_delete=models.CASCADE, related_name="images")
    chepare_type = models.CharField(max_length=20, choices=CHEPARE_TYPES)
    image = models.ImageField(upload_to=image_directory_distributor)

    def __str__(self):
        return f"{self.seller.name} - {self.chepare_type}"
