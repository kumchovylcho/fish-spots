import { baseUrl } from "./users";


export const createLandscape = async (form) => {
    try {
        const response = await fetch(`${baseUrl}/landscapes/create`, {
            method: 'POST',
            body: form
        });
        return response;
    } catch (error) {
        
    }
}

export const getLandscapePage = async (page) => {
    try {
        const response = await fetch(`${baseUrl}/landscapes/list?page=${page}`);
        return response;
    } catch (error) {
        
    }
}

export const deleteLandscape = async (id) => {
    try {
        const response = await fetch(`${baseUrl}/landscapes/delete/${id}`, {method: 'DELETE'});
        return response;
    } catch (error) {

    }
}