import { Link } from 'react-router-dom'

const Home = () => {
    return (
    <>
        <div className="flex justify-center items-center h-96 min-h-fit overflow-hidden relative">
            <img 
                className="w-full h-full object-cover"
                src="https://cdn.discordapp.com/attachments/1156335620919152650/1158426766570958858/banner.jpg?ex=651c347f&is=651ae2ff&hm=c749db915563dabe3e6788c989dbd4a889a1cdbca4a9e058520ebf00eb84a6a5&"
                alt="banner">
            </img>
            <div className="absolute bg-zinc-900 opacity-60 w-full h-full"></div>
            <article className="flex flex-col justify-center gap-8 absolute text-white">
                <h2 className="text-4xl font-medium tracking-widest">
                    Тук ще откриете вашите места за <span className="text-sky-400">риболов!</span>
                </h2>

                <Link
                    to="/register"
                    className="bg-emerald-400 self-center px-10 py-4 text-2xl rounded-full font-medium hover:bg-teal-600">
                    Регистрирай се!
                </Link>

            </article>
        </div>

        <article className="bg-zinc-300 py-16">
            <h2 className="text-center text-4xl mb-24 relative">
                Информация за над 25 места!
                <div className="absolute top-[115%] left-2/4 -translate-x-2/4 -translate-y-1/2 w-60 h-0.5 bg-cyan-600"></div>
            </h2>

            <div className="flex justify-center gap-x-12 w-3/5 mr-auto ml-auto">
                <section className="bg-gray-200 p-8 rounded-3xl">
                    <h3 className="text-2xl text-center font-bold mb-6">ВАРНА</h3>
                    <div className="flex justify-center gap-x-12">
                        <section className="text-2xl">
                            <p className="mb-3 inline-flex justify-between w-full">
                                13 места
                                <span>
                                    <i className="fa-solid fa-check text-white bg-green-500 p-1.5 rounded-full"></i>
                                </span>
                            </p>
                            <p className="mb-3 inline-flex justify-between w-full">
                                Автоматизирани подсказки
                                <span>
                                    <i className="fa-solid fa-check text-white bg-green-500 p-1.5 rounded-full"></i>
                                </span>
                            </p>
                            <p className="mb-3 inline-flex justify-between w-full">
                                Правилна информация
                                <span>
                                    <i className="fa-solid fa-check text-white bg-green-500 p-1.5 rounded-full"></i>
                                </span>
                            </p>
                        </section>
                    </div>
                    
                </section>

                <section className="bg-gray-200 p-8 rounded-3xl">
                    <h3 className="text-2xl text-center font-bold mb-6">БУРГАС</h3>
                    <div className="flex justify-center gap-x-12">
                    <section className="text-2xl">
                            <p className="mb-3 inline-flex justify-between w-full">
                                14 места
                                <span>
                                    <i className="fa-solid fa-check text-white bg-green-500 p-1.5 rounded-full"></i>
                                </span>
                            </p>
                            <p className="mb-3 inline-flex justify-between w-full">
                                Автоматизирани подсказки
                                <span>
                                    <i className="fa-solid fa-check text-white bg-green-500 p-1.5 rounded-full"></i>
                                </span>
                            </p>
                            <p className="mb-3 inline-flex justify-between w-full">
                                Правилна информация
                                <span>
                                    <i className="fa-solid fa-check text-white bg-green-500 p-1.5 rounded-full"></i>
                                </span>
                            </p>
                        </section>
                    </div>
                </section>
            </div>
        </article>
    </>
    );
}



export default Home;