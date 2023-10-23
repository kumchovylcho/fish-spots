from backend.celery import app
from fish_regions.models import VarnaRegion, BurgasRegion
from . import helpers
import requests
from notification import consumers

from channels.layers import get_channel_layer

from asgiref.sync import async_to_sync




@app.task()
def update_regions() -> None:
    regions = {
        "varna": {"places": (
                            (43.5163252, 28.5932185),
                            (43.322895, 28.0594381),
                            (43.1997359, 27.9140717)
                            ),
                "list_place_names": ["Shabla", "Kranevo", "Varna"],
                "operation": "",
                "model": VarnaRegion,
        },

        "burgas": {"places": (
                            (42.4857915, 27.4752997),
                            (42.4575539, 27.6262701),
                            (42.2665013, 27.7619339)
                            ),
                "list_place_names": ["Burgas", "Chernomorets", "Primorsko"],
                "operation": "",
                "model": BurgasRegion,
        },
    }


    for data in regions.values():
        if helpers.place_in_region_exist(data["model"], data["list_place_names"]):
            data["operation"] = helpers.update_region_model
        else:
            data["operation"] = helpers.create_region_object

        for longitude, latitude in data["places"]:
            query = helpers.get_query(longitude, latitude)
            try:
                response = requests.get(query)
            except:
                continue

            if response.status_code != 200:
                continue

            weather_data = response.json()

            data["operation"](data["model"], weather_data)
            


update_regions.delay()
