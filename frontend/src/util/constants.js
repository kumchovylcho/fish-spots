const baseUrl = 'http://127.0.0.1:8000';
const websiteName = 'Fish Spots';

const fishSpotAreasInRegion = {
    varna: ['shabla', 'kranevo', 'varna'],
    burgas: ['burgas', 'chernomorets', 'primorsko'],
};

const bulgarianToLatinCities = {
    Шабла: 'shabla',
    Кранево: 'kranevo',
    Варна: 'varna',
    Бургас: 'burgas',
    Черноморец: 'chernomorets',
    Приморско: 'primorsko',
};

const latinToBulgarianCities = {
    shabla: 'Шабла',
    kranevo: 'Кранево',
    varna: 'Варна',
    burgas: 'Бургас',
    chernomorets: 'Черноморец',
    primorsko: 'Приморско',
};

export {
    baseUrl,
    websiteName,
    fishSpotAreasInRegion,
    bulgarianToLatinCities,
    latinToBulgarianCities,
};
