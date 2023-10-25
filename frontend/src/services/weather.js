import { baseUrl } from './users';


export const getWeather = async () => {
    const response = await fetch(`${baseUrl}/regions/weather/`);
    return await response.json();

}