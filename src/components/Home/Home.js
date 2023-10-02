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
                    className="bg-emerald-400 self-center px-10 py-4 text-2xl rounded-full font-medium">
                    Регистрирай се!
                </Link>

            </article>
        </div>
    </>
    );
}



export default Home;