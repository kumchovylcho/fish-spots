import { baseUrl } from '../util/constats';

export const getFishPlaces = async (region) => {
    const response = await fetch(`${baseUrl}/places/?region=${region}`);
    return await response.json();
};

export const createFishPlace = async (formData) => {
    const options = {
        method: 'POST',
        body: formData,
        credentials: 'include',
    };
    return await fetch(`${baseUrl}/places/create/`, options);
};

export const deleteFishPlace = async (placeId) => {
    const options = {
        method: 'DELETE',
        credentials: 'include',
    };
    return await fetch(`${baseUrl}/places/delete/${placeId}/`, options);
};
