from backend.celery import app
from fish_regions.models import VarnaRegion


@app.task()
def update_regions():
    region = VarnaRegion(city_name="asd",
                         sunrise="asd",
                         sunset="asd",
                         date="asd",
                         time="asd",
                         feels_like=1,
                         normal_temperature=1,
                         min_temperature=1,
                         max_temperature=1,
                         weather_icon_url="asd",
                         wind_direction="asd",
                         wind_speed=1
                        )
    
    region.save()


update_regions.delay()