from .models import Place


def generate_errors_messages(
    field: str, null=None, blank=None, required=None, invalid=None
) -> dict[str, dict[str, str]]:
    error_messages = {}

    if null:
        error_messages["null"] = f"The {field} field cannot be null."

    if blank:
        error_messages["blank"] = f"The {field} field cannot be blank."

    if required:
        error_messages["required"] = f"The {field} field is required."

    if invalid:
        error_messages["invalid"] = f"The {field} field is invalid."

    return {"error_messages": error_messages}


def is_wind_bad_for_place(today_data: list[dict], place: Place) -> bool:
    """
    We check difference because if the wind is strong and it is not coming from a bad direction, then
    we cannot fish, since the wind is just too strong.

    Max wind speed difference is needed for the wind which is coming from a good direction.
    It is calculated by removing (current_wind - max_allowed_wind_speed_for_place). If the result
    is bigger than that max wind speed difference, then the wind is just very strong.
    """
    max_wind_speed_difference = 2
    max_in_a_row_bad_wind = 2
    bad_wind_counter = 0

    for data in today_data:
        bad_wind_direction = data.get(
            "wind_direction"
        ) in place.bad_wind_directions.split(", ")
        exceeds_max_wind_speed = int(data.get("wind_speed", 0)) > place.max_wind_speed
        wind_speed_difference = (
            int(data.get("wind_speed", 0)) - place.max_wind_speed
            >= max_wind_speed_difference
        )

        if (bad_wind_direction and exceeds_max_wind_speed) or wind_speed_difference:
            bad_wind_counter += 1
        elif bad_wind_counter > 0:
            bad_wind_counter = 0

        if bad_wind_counter >= max_in_a_row_bad_wind:
            return False

    return True


def decide_to_show_spot(today_data: list[dict], place: Place) -> bool:
    morning = []
    afternoon = []

    for data in today_data:
        current_hour = data.get("time", "")[:2]
        if not current_hour:
            print(
                "time is not existing or bad value, fish_places/utils.py@decide_to_show_spot"
            )
            return False

        current_hour = int(current_hour)
        if current_hour < 12:
            morning.append(data)
            continue

        afternoon.append(data)

    is_morning_good_for_fishing = False
    is_afternoon_good_for_fishing = False

    if len(morning) >= 2:
        is_morning_good_for_fishing = is_wind_bad_for_place(morning, place)

    if len(afternoon) >= 2:
        is_afternoon_good_for_fishing = is_wind_bad_for_place(afternoon, place)

    return is_morning_good_for_fishing or is_afternoon_good_for_fishing
