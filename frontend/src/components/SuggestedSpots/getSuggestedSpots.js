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
    let maxInARowBadWind = 2;
    let counter = 0;

    for (const data of cityWeatherArr) {
        if ((fishSpot.bad_wind_directions.includes(data.wind_direction) && data.wind_speed >= fishSpot.max_wind_speed)
            || (data.wind_speed > fishSpot.max_wind_speed && data.wind_speed - fishSpot.max_wind_speed >= 2)) {
            counter += 1;
        }

        if (counter >= maxInARowBadWind) {
            return false;
        }
    }

    return true;
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

    let isMorningFine = false;
    let isAfterNoonFine = false;

    if (morning.length >= 2) {
        isMorningFine = calculateWind(morning, fishSpot);
    }
    
    if (afterNoon.length >= 2) {
        isAfterNoonFine = calculateWind(afterNoon, fishSpot);
    }

    return isMorningFine || isAfterNoonFine;
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

