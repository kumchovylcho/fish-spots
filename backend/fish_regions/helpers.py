from django.conf import settings
import datetime

weather_api_key = settings.CONFIG['WEATHER_API']


def english_to_bulgarian_places(place: str) -> str:
    all_places = {
        "Shabla": "Шабла",
        "Kranevo": "Кранево",
        "Varna": "Варна",
        "Burgas": "Бургас",
        "Chernomorets": "Черноморец",
        "Primorsko": "Приморско"
    }

    return all_places[place]


def get_query(longitude: float, latitude: float) -> str:
    return f"http://api.openweathermap.org/data/2.5/forecast?lat={longitude}&lon={latitude}&units=metric&appid={weather_api_key}"


def get_weather_icon(icon_id: str):
    return f"https://openweathermap.org/img/wn/{icon_id}@2x.png"


def get_wind_direction(degrees: float) -> str:
    result = "Север"

    if 20 < degrees <= 75:
        result = "Североизток"

    elif 75 < degrees <= 105:
        result = "Изток"

    elif 105 < degrees <= 165:
        result = "Югоизток"

    elif 165 < degrees <= 195:
        result = "Юг"

    elif 195 < degrees <= 255:
        result = "Югозапад"

    elif 255 < degrees <= 285:
        result = "Запад"

    elif 285 < degrees < 340:
        result = "Северозапад"

    return result


def place_in_region_exist(model, places: list) -> bool:
    for place in places:
        if model.objects.filter(city_name=place).exists():
            return True

    return False


def update_region_model(model, data: dict) -> None:
    curr_city_name = data["city"]["name"]
    curr_sunrise = datetime.datetime.fromtimestamp(
        data["city"]["sunrise"]).strftime("%H:%M")
    curr_sunset = datetime.datetime.fromtimestamp(
        data["city"]["sunset"]).strftime("%H:%M")

    place_objects = model.objects.filter(city_name=curr_city_name)
    for i in range(len(place_objects)):
        place_obj = place_objects[i]
        weather_data_for_place_obj = data["list"][i]

        curr_date, curr_time = weather_data_for_place_obj["dt_txt"].split()

        place_obj.sunrise = curr_sunrise
        place_obj.sunset = curr_sunset
        place_obj.date = curr_date
        place_obj.time = curr_time
        place_obj.feels_like = round(weather_data_for_place_obj["main"]["feels_like"])
        place_obj.normal_temperature = round(weather_data_for_place_obj["main"]["temp"])
        place_obj.min_temperature = round(weather_data_for_place_obj["main"]["temp_min"])
        place_obj.max_temperature = round(weather_data_for_place_obj["main"]["temp_max"])
        place_obj.weather_icon_url = get_weather_icon(weather_data_for_place_obj["weather"][0]["icon"])
        place_obj.wind_direction = get_wind_direction(weather_data_for_place_obj["wind"]["deg"])
        place_obj.wind_speed = round(weather_data_for_place_obj["wind"]["speed"])

        place_obj.save()

def create_region_object(model, data: dict) -> None:
    curr_city_name = data["city"]["name"]
    curr_sunrise = datetime.datetime.fromtimestamp(
        data["city"]["sunrise"]).strftime("%H:%M")
    curr_sunset = datetime.datetime.fromtimestamp(
        data["city"]["sunset"]).strftime("%H:%M")


    for data in data["list"]:
        curr_date, curr_time = data["dt_txt"].split()

        region = model(city_name=curr_city_name,
                       sunrise=curr_sunrise,
                       sunset=curr_sunset,
                       date=curr_date,
                       time=curr_time,
                       feels_like=round(data["main"]["feels_like"]),
                       normal_temperature=round(data["main"]["temp"]),
                       min_temperature=round(data["main"]["temp_min"]),
                       max_temperature=round(data["main"]["temp_max"]),
                       weather_icon_url=get_weather_icon(data["weather"][0]["icon"]),
                       wind_direction=get_wind_direction(data["wind"]["deg"]),
                       wind_speed=round(data["wind"]["speed"])
                       )

        region.save()
