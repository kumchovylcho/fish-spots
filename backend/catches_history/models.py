from django.db import models


class CatchHistory(models.Model):
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
