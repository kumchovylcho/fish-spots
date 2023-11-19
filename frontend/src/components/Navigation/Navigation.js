import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { logoutUser } from '../../services/users';

const Navigation = () => {
    const {user, authTokens, setAuthTokens, setUser} = useContext(AuthContext)
    const navigate = useNavigate();

    return (
        <header className="flex justify-center p-6 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium text-2xl">
            <nav className="flex justify-between w-5/6 max-w-screen-2xl max-md:flex-col max-md:items-center">
                <h1 className="hover:text-stone-300 duration-300 max-md:mb-10 max-md:text-center">
                    <Link to="/">Риболовни места</Link>
                </h1>

                <ul className="flex gap-12 flex-wrap max-md:flex-col max-md:items-center">
                    <li className="hover:text-stone-300 duration-300">
                        <Link to="/city">Градове</Link>
                    </li>
                    <li className="hover:text-stone-300 duration-300">
                        <Link to="/landscapes">Пейзажи</Link>
                    </li>

                    {user ? (
                        <div className="max-md:flex-col max-md:items-center flex gap-7">
                            <p className="hover:text-stone-300 duration-300">
                                <Link to={`/profile/${user.username}`}>
                                    <i className="fa-solid fa-user"></i>
                                </Link>
                            </p>
                            <p 
                                onClick={() => logoutUser(authTokens, setAuthTokens, setUser, navigate, "/login")}
                                className="text-red-500 hover:text-red-600 duration-300 hover:cursor-pointer">
                                <i className="fa-solid fa-right-from-bracket"></i>
                            </p>
                        </div>
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