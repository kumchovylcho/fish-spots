import jwt_decode from 'jwt-decode';


const baseUrl = "http://127.0.0.1:8000"


const register = async (data) => {
    const options = {
        method: "POST",
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(data)
}

    return await fetch(`${baseUrl}/api/register/`, options);
}


const loginUser = async (e, setAuthTokens, setUser, navigate, navigateTo, setError="") => {
    e.preventDefault();

    const userCredentials = {
        "username": e.target.username.value,
        "password": e.target.password.value
    }

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userCredentials)
    };

    const response = await fetch(`${baseUrl}/api/token/`, options);
    const data = await response.json();

    if (response.status === 200) {
        setAuthTokens(data);
        setUser(jwt_decode(data.access));
        localStorage.setItem("authTokens", JSON.stringify(data));
        navigate(navigateTo);
    }else {
        if (setError) {
            setError(true);
        } 
    }
}


const createNewToken = async (dataOfUser, setAuthTokens, setUser) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dataOfUser)
    };

    try {
        const response = await fetch(`${baseUrl}/api/token/`, options);
        const data = await response.json();
 
        setAuthTokens(data);
        setUser(jwt_decode(data.access));
        localStorage.setItem("authTokens", JSON.stringify(data));

    } catch (error) {

    }
}


const logoutUser = async (authTokens, setAuthTokens, setUser, navigate, navigateTo) => {
    const response = await fetch(`${baseUrl}/api/logout/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({refreshToken: authTokens?.refresh}),
    });

    if (response.status === 200) {
        setAuthTokens("");
        setUser("");
        localStorage.removeItem("authTokens");
        navigate(navigateTo);
    }
}


const userExistsData = async (userDataObj) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userDataObj)
    }
    try {
        const response = await fetch(`${baseUrl}/profile/user-exists/`, options);
        return response;
    } catch (error) {
        
    }
}


const changeUserData = async (username, updateObjData) => {
    try {
        const response = await fetch(`${baseUrl}/profile/edit/${username}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateObjData),
        });
        return response;
    } catch (error) {

    }
}

const changeUserPassword = async (username, updateObjData) => {
    try {
        const response = await fetch(`${baseUrl}/profile/edit-password/${username}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateObjData),
        });
        return response;
    } catch (error) {

    }
}


export {
    register, 
    loginUser, 
    logoutUser, 
    userExistsData, 
    changeUserData, 
    createNewToken, 
    changeUserPassword, 
    baseUrl
};