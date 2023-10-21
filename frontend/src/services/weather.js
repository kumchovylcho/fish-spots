import { baseUrl } from './users';


export const getWeather = async (region, place) => {
    const response = await fetch(`${baseUrl}/regions/weather/?region=${region}&place=${place}`);
    return await response.json();

}