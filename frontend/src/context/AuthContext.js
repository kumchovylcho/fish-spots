import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const AuthContext = createContext();


export default AuthContext;


export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(() => localStorage.getItem("authTokens") ? jwt_decode(localStorage.getItem("authTokens")) : "");
    const [authTokens, setAuthTokens] = useState(() => localStorage.getItem("authTokens") ? JSON.parse(localStorage.getItem("authTokens")) : "");

    const navigate = useNavigate();

    const loginUser = async (e) => {
        e.preventDefault();

        const userCredentials = {
            "username": e.target.username.value,
            "password": e.target.password.value
        }

        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userCredentials)
        };

        const response = await fetch("http://127.0.0.1:8000/api/token/", options);
        const data = await response.json();

        if (response.status === 200) {
            setAuthTokens(data);
            setUser(jwt_decode(data.access));
            localStorage.setItem("authTokens", JSON.stringify(data))
            navigate("/")
        }else {
            alert("broken website")
        }
    }

    const logoutUser = () => {
        setAuthTokens("");
        setUser("");
        localStorage.removeItem("authTokens");
        navigate("/login");
    }

    let contextData = {
        user: user,
        loginUser: loginUser,
        logoutUser: logoutUser
    };

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
}