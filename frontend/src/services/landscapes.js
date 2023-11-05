import { baseUrl } from "./users";


export const createLandscape = async (form) => {
    try {
        const response = await fetch(`${baseUrl}/landscapes/create`, {
            method: 'POST',
            body: form
        })
        const data = await response.json();
        return data
    } catch (error) {
        
    }
}
