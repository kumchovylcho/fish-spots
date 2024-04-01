import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const AuthorizedRoute = ({ children, navigateTo }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
        return <Navigate to={navigateTo} replace={true} />;
    }

    return children;
};

export default AuthorizedRoute;
