import jwt_decode from 'jwt-decode';


const baseUrl = "http://127.0.0.1:8000/api/"


const register = async (data) => {
    const options = {
        method: "POST",
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(data)
}

    return await fetch(`${baseUrl}register/`, options);
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

    const response = await fetch(`${baseUrl}token/`, options);
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


const logoutUser = async (authTokens, setAuthTokens, setUser, navigate, navigateTo) => {
    const response = await fetch(`${baseUrl}logout/`, {
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


export {register, loginUser, logoutUser, baseUrl};