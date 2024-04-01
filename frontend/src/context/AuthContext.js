import { useState, createContext, useEffect } from 'react';
import { baseUrl } from '../util/constats';

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
    const [Id, setId] = useState('');
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

                if (response.status === 200) {
                    handleSetUser(data.user, data.id);
                } else if (response.status === 401) {
                    resetUser();
                }
            } catch (error) {
                console.error('authentication error');
            }
        };

        authorize();
    }, []);

    const handleSetUser = (username, id) => {
        setUser(username);
        setId(id);
        setIsLogged(true);
    };

    const resetUser = () => {
        setUser('');
        setId('');
        setIsLogged(false);
    };

    let contextData = {
        Id,
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
