const getFishSpotCity = (fishSpot) => {
    const regionSpots = {
        "shabla": ["tyulenovo"],
        "kranevo": ["kranevo"],
        "varna": ["panorama", "noi", "slanchev-den", "panelite", "trakata", "buna-1", "buna-4", "valnolom", "morska-gara-varna", "pod-mosta", "jelezniq-most", "asparuhovo-buna"],
        "burgas": ["morska-gara-burgas"],
        "chernomorets": ["nos-akra", "vilata-na-plevneliev", "nos-chervenka", "germankata"],
        "primorsko": ["nos-agalina", "maslen-nos", "mirius", "plaj-perla", "primorsko-kraibrejna", "primorsko-pristanishte", "kiten-zangador", "kiten-parzalkata", "kiten-golqmata-buna"]
    }

    for (const [key, value] of Object.entries(regionSpots)) {
        if (value.includes(fishSpot)) {
            return key
        }
    }
}

const calculateWind = (cityWeatherArr, fishSpot) => {
    let maxInARowBadWind = 3;
    let counter = 0;

    for (const data of cityWeatherArr) {
        if (fishSpot.bad_wind_directions.includes(data.wind_direction) && data.wind_speed >= fishSpot.max_wind_speed) {
            counter += 1;
            continue
        }

        counter = 0;
    }

    return counter !== maxInARowBadWind;
}

const decideToShowSpot = (fishSpot, weatherData, cityKey) => {
    const morning = [];
    const afterNoon = [];

    for (const data of weatherData[cityKey].today.list_hours) {
        const currentHour = parseInt(data.time.slice(0, 2));

        if (currentHour < 12) {
            morning.push(data);
            continue
        }
        afterNoon.push(data);
    }

    const canFishMorning = calculateWind(morning, fishSpot);
    const canFishAfterNoon = calculateWind(afterNoon, fishSpot);

    return canFishMorning || canFishAfterNoon;
}

export const getSuggestedSpots = (weatherData, fishSpots) => {
    const spots = [];

    for (const item in fishSpots) {
        const cityKey = getFishSpotCity(fishSpots[item].place);

        if (decideToShowSpot(fishSpots[item], weatherData, cityKey)) {
            spots.push(fishSpots[item]);
        }
    }

    return spots;
}

