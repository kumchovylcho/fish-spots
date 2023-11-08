import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { logoutUser } from '../../services/users';

const Navigation = () => {
    const {user, authTokens, setAuthTokens, setUser} = useContext(AuthContext)
    const navigate = useNavigate();

    return (
        <header className="flex justify-center p-6 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium text-2xl">
            <nav className="flex justify-between w-5/6 max-w-screen-2xl">
                <h1 className="hover:text-stone-300 duration-300">
                    <Link to="/">Риболовни места</Link>
                </h1>

                <ul className="flex gap-12 flex-wrap">
                    <li className="hover:text-stone-300 duration-300">
                        <Link to="/city">Градове</Link>
                    </li>
                    <li className="hover:text-stone-300 duration-300">
                        <Link to="/landscapes">Пейзажи</Link>
                    </li>

                    {user ? (
                        <li 
                            onClick={() => logoutUser(authTokens, setAuthTokens, setUser, navigate, "/login")}
                            className="hover:text-stone-300 duration-300 hover:cursor-pointer">
                            Излез
                        </li>
                    ) : (
                        <>
                            <li className="hover:text-stone-300 duration-300">
                                <Link to="/login">Влез</Link>
                            </li>
                            <li className="hover:text-stone-300 duration-300">
                                <Link to="/register">Регистрация</Link>
                            </li>
                        </>
                    )}

                </ul>
            </nav>
        </header>
    );
}


export default Navigation;