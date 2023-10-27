import { baseUrl } from './users';


export const getFishPlaces = async (region) => {
    const response = await fetch(`${baseUrl}/places/?region=${region}`);
    return await response.json();
}