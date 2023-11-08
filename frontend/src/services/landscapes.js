import { baseUrl } from "./users";


export const createLandscape = async (form) => {
    try {
        const response = await fetch(`${baseUrl}/landscapes/create`, {
            method: 'POST',
            body: form
        })
        return response
    } catch (error) {
        
    }
}
