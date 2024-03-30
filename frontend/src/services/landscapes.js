import { baseUrl } from '../util/constats';

export const createLandscape = async (form) => {
    try {
        const response = await fetch(`${baseUrl}/landscapes/create`, {
            method: 'POST',
            body: form,
        });
        return response;
    } catch (error) {}
};

export const getLandscapePage = async (page, userId = '') => {
    const url = `${baseUrl}/landscapes/list?page=${page}`;
    const userIdInfo = userId ? `user=${userId}` : '';

    try {
        const response = await fetch(`${url}&${userIdInfo}`);
        return response;
    } catch (error) {}
};

export const deleteLandscape = async (id) => {
    try {
        const response = await fetch(`${baseUrl}/landscapes/delete/${id}`, {
            method: 'DELETE',
        });
        return response;
    } catch (error) {}
};

export const editLandscape = async (title, description, id) => {
    const updateData = {
        title: title,
        description: description,
    };

    try {
        const response = await fetch(`${baseUrl}/landscapes/edit/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateData),
        });
        return response;
    } catch (error) {}
};
