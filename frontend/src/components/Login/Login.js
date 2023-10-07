import { useState, useContext } from 'react';
import AuthContext from '../../context/AuthContext';

const Login = () => {
    const [passwordEye, setPasswordEye] = useState(false);
    const { loginUser } = useContext(AuthContext);

    return (
        <article className="flex justify-center items-center p-16">
            <form onSubmit={loginUser} className="flex flex-col basis-1/4 gap-8 p-12 rounded-xl text-xl bg-white">
                <section className="flex flex-col gap-4">
                    <label className="font-medium" htmlFor="username">Потребителско име</label>
                    <input 
                        className="p-2 border-solid border-2 border-black rounded-xl" 
                        type="text" 
                        id="username" 
                        name="username">
                    </input>
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