import { useState, createContext, useEffect } from 'react';
import { baseUrl } from '../util/constats';

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState('');
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        const authorize = async () => {
            try {
                const options = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                };
                const response = await fetch(
                    `${baseUrl}/api/authorize/`,
                    options
                );
                const data = await response.json();
                console.log(response);
                console.log(data);

                if (response.status === 200) {
                    handleSetUser(data.user);
                } else if (response.status === 401) {
                    resetUser();
                }
            } catch (error) {
                console.error('authentication error');
            }
        };

        authorize();
    }, []);

    const handleSetUser = (username) => {
        setUser(username);
        setIsLogged(true);
    };

    const resetUser = () => {
        setUser('');
        setIsLogged(false);
    };

    let contextData = {
        user,
        isLogged,
        handleSetUser,
        resetUser,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
};
