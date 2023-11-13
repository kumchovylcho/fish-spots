import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import setDocTitle from '../../util/setDocTitle';
import { useContext } from 'react';

const Home = () => {
    const { user } = useContext(AuthContext);

    setDocTitle('Home');

    return (
        <main>
            <div className="flex justify-center items-center h-96 min-h-fit overflow-hidden relative">
                <img
                    className="w-full h-full object-cover"
                    src="https://i.ibb.co/KFtrCdW/banner.jpg"
                    alt="banner"
                ></img>
                <div className="absolute bg-zinc-900 opacity-60 w-full h-full"></div>
                <article className="flex flex-col justify-center gap-8 absolute text-white">
                    <h2 className="text-4xl text-center font-medium tracking-widest">
                        Тук ще откриете вашите места за{' '}
                        <span className="text-sky-400">риболов!</span>
                    </h2>

                    <Link
                        to="/register"
                        className={`${
                            user ? 'hidden' : 'block'
                        } bg-emerald-400 self-center px-10 py-4 text-2xl rounded-full font-medium hover:bg-teal-600 duration-300 hover:scale-105`}
                    >
                        Регистрирай се!
                    </Link>
                </article>
            </div>

            <article className="py-16">
                <h2 className="text-center text-4xl mb-24 relative">
                    Информация за над 25 места!
                    <div className="absolute top-[115%] left-2/4 -translate-x-2/4 -translate-y-1/2 w-60 h-0.5 bg-cyan-600"></div>
                </h2>

                <div className="w-full flex flex-wrap justify-center gap-12 w-3/5">
                    <Link to="/city">
                        <section className="max-w-lg bg-gray-200 p-8 rounded-3xl hover:scale-105 duration-150 cursor-pointer">
                            <h3 className="text-2xl text-center font-bold mb-6">
                                ВАРНА
                            </h3>
                            <div className="flex justify-center gap-x-12">
                                <section className="text-2xl">
                                    <p className="mb-3 inline-flex justify-between w-full">
                                        14 места
                                        <span>
                                            <i className="fa-solid fa-check text-white bg-green-500 p-1.5 rounded-full w-8 h-8"></i>
                                        </span>
                                    </p>
                                    <p className="mb-3 inline-flex justify-between w-full">
                                        Автоматизирани подсказки
                                        <span>
                                            <i className="fa-solid fa-check text-white bg-green-500 p-1.5 rounded-full w-8 h-8"></i>
                                        </span>
                                    </p>
                                    <p className="mb-3 inline-flex justify-between w-full">
                                        Правилна информация
                                        <span>
                                            <i className="fa-solid fa-check text-white bg-green-500 p-1.5 rounded-full w-8 h-8"></i>
                                        </span>
                                    </p>
                                </section>
                            </div>
                        </section>
                    </Link>

                    <Link to="/city">
                        <section className="max-w-lg bg-gray-200 p-8 rounded-3xl hover:scale-105 duration-150 cursor-pointer">
                            <h3 className="text-2xl text-center font-bold mb-6">
                                БУРГАС
                            </h3>
                            <div className="flex justify-center gap-x-12">
                                <section className="text-2xl">
                                    <p className="mb-3 inline-flex justify-between w-full">
                                        14 места
                                        <span>
                                            <i className="fa-solid fa-check text-white bg-green-500 p-1.5 rounded-full w-8 h-8"></i>
                                        </span>
                                    </p>
                                    <p className="mb-3 inline-flex justify-between w-full">
                                        Автоматизирани подсказки
                                        <span>
                                            <i className="fa-solid fa-check text-white bg-green-500 p-1.5 rounded-full w-8 h-8"></i>
                                        </span>
                                    </p>
                                    <p className="mb-3 inline-flex justify-between w-full">
                                        Правилна информация
                                        <span>
                                            <i className="fa-solid fa-check text-white bg-green-500 p-1.5 rounded-full w-8 h-8"></i>
                                        </span>
                                    </p>
                                </section>
                            </div>
                        </section>
                    </Link>
                </div>
            </article>

            <article className="mb-10">
                <h3 className="text-center text-4xl mb-8">
                    Защо ви е да се регистрирате?
                </h3>
                <section className="max-w-lg mx-auto bg-gray-200 p-8 rounded-3xl">
                    <h3 className="text-2xl text-center font-bold mb-6">
                        Ще получите:
                    </h3>
                    <div className="flex justify-center gap-x-12">
                        <section className="text-2xl">
                            <p className="mb-3 inline-flex justify-between w-full">
                                Право да създавате пейзажи
                                <span>
                                    <i className="fa-solid fa-check text-white bg-green-500 p-1.5 rounded-full w-8 h-8"></i>
                                </span>
                            </p>
                            <p className="mb-10 inline-flex justify-between w-full">
                                Достъп до личните ви пейзажи
                                <span>
                                    <i className="fa-solid fa-check text-white bg-green-500 p-1.5 rounded-full w-8 h-8"></i>
                                </span>
                            </p>
                            <section className="text-center">
                                <Link 
                                    className="bg-emerald-400 px-10 py-4 text-2xl rounded-full font-medium hover:bg-teal-600 duration-300 hover:scale-105"
                                    to={user ? "/landscapes" : "/register"}
                                    >
                                    {user ? "Създавай!" : "Регистрирай се!"}
                                </Link>
                            </section>
                        </section>
                    </div>
                </section>
            </article>
        </main>
    );
};

export default Home;
