import { useState, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/users';
import FormError from '../FormError/FormError';
import setDocTitle from '../../util/setDocTitle';

const Login = () => {
    const [passwordEye, setPasswordEye] = useState(false);
    const { setAuthTokens, setUser } = useContext(AuthContext);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    setDocTitle("Login");

    return (
        <article className="flex justify-center items-center p-16">
            <form 
                onSubmit={(e) => loginUser(e, setAuthTokens, setUser, navigate, "/", setError)} 
                className="flex flex-col basis-1/4 gap-8 p-12 rounded-xl text-xl bg-white"
                >
                <section className="flex flex-col gap-4">
                    <label className="font-medium" htmlFor="username">Потребителско име</label>
                    <input 
                        className="p-2 border-solid border-2 border-black rounded-xl" 
                        type="text" 
                        id="username" 
                        name="username">
                    </input>
                    {error ? <FormError msg={"Невалидно потребителско име или парола."}/> : ""}
                </section>

                <section className="flex flex-col gap-4">
                    <label className="font-medium" htmlFor="password">Парола</label>
                    <section className="flex relative items-center">
                        <input 
                            className="p-2 border-solid border-2 border-black rounded-xl w-full" 
                            type={passwordEye ? "text": "password"}
                            id="password"
                            name="password">
                        </input>
                        <i
                            onClick={() => setPasswordEye(!passwordEye)}
                            className={`fa-solid ${passwordEye ? "fa-eye" : "fa-eye-slash"} absolute right-6 bottom-[0.8rem] hover:cursor-pointer`}>
                        </i>
                    </section>
                </section>

                <button 
                    type="submit"
                    className="bg-[#10ACDB] text-white rounded-xl p-4 hover:bg-cyan-800">
                    Влез
                </button>
            </form>
        </article>
    );

}

export default Login;