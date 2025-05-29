from django.db import models
from django.conf import settings


class CatchHistory(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True
    )
    # year-month-day
    date = models.DateField()
    city = models.CharField()
    fish_spot = models.CharField()
    fish_type = models.CharField()
    # колко риба сме хванали(кг)
    quantity = models.FloatField()
    lure_type = models.CharField()
    # e.g: 14:30
    from_hour = models.TimeField()
    to_hour = models.TimeField()
    # късания
    snaps = models.PositiveIntegerField()
    good_weather = models.BooleanField()
