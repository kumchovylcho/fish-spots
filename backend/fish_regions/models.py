from django.db import models


class CommonCharField(models.CharField):
    def __init__(self, *args, **kwargs):
        kwargs['max_length'] = 60
        kwargs['null'] = False
        kwargs['blank'] = False
        super().__init__(*args, **kwargs)


class BaseRegion(models.Model):

    city_name = CommonCharField()       
    sunrise = CommonCharField()
    sunset = CommonCharField()
    date = CommonCharField()
    time = CommonCharField()

    feels_like = models.IntegerField()
    normal_temperature = models.IntegerField()
    min_temperature = models.IntegerField()
    max_temperature = models.IntegerField()
    weather_icon_url = CommonCharField()

    wind_direction = CommonCharField()
    wind_speed = models.IntegerField() # meters per second

    class Meta:
        abstract = True

    def __str__(self):
        return self.city_name


class VarnaRegion(BaseRegion):
    pass


class BurgasRegion(BaseRegion):
    pass