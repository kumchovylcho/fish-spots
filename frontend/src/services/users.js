import jwt_decode from 'jwt-decode';
import { baseUrl } from '../util/constants';

const loginUser = async (username, password) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
    };

    return await fetch(`${baseUrl}/api/token/`, options);
};

const createNewToken = async (dataOfUser, setAuthTokens, setUser) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataOfUser),
    };

    try {
        const response = await fetch(`${baseUrl}/api/token/`, options);
        const data = await response.json();

        setAuthTokens(data);
        setUser(jwt_decode(data.access));
        localStorage.setItem('authTokens', JSON.stringify(data));
    } catch (error) {}
};

const logoutUser = async () => {
    return await fetch(`${baseUrl}/api/logout/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
};

const userExistsData = async (userDataObj) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userDataObj),
    };
    try {
        const response = await fetch(
            `${baseUrl}/profile/user-exists/`,
            options
        );
        return response;
    } catch (error) {}
};

const changeUserData = async (username, updateObjData) => {
    try {
        const response = await fetch(`${baseUrl}/profile/edit/${username}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateObjData),
        });
        return response;
    } catch (error) {}
};

const changeUserPassword = async (username, updateObjData) => {
    try {
        const response = await fetch(
            `${baseUrl}/profile/edit-password/${username}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateObjData),
            }
        );
        return response;
    } catch (error) {}
};

export {
    loginUser,
    logoutUser,
    userExistsData,
    changeUserData,
    createNewToken,
    changeUserPassword,
};
