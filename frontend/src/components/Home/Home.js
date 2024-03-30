import { Link } from 'react-router-dom';
import setDocTitle from '../../util/setDocTitle';
import CityCard from './CityCard';

const cityCards = [
    {
        cityName: 'ВАРНА',
        linkTo: '/city?search=varna',
        cityData: [
            '14 места',
            'Автоматизирани подсказки',
            'Правилна информация',
        ],
    },
    {
        cityName: 'БУРГАС',
        linkTo: '/city?search=burgas',
        cityData: [
            '14 места',
            'Автоматизирани подсказки',
            'Правилна информация',
        ],
    },
];

const Home = () => {
    setDocTitle('Home');

    return (
        <main>
            <div className="flex justify-center items-center h-96 min-h-fit overflow-hidden relative">
                <img
                    className="w-full h-full object-cover"
                    src={process.env.PUBLIC_URL + '/assets/banner.jpg'}
                    alt="banner"
                ></img>
                <div className="absolute bg-zinc-900 opacity-60 w-full h-full"></div>
                <article className="flex flex-col justify-center gap-8 absolute text-white">
                    <h2 className="max-md:text-2xl max-md:px-6 text-4xl text-center font-medium tracking-widest">
                        Тук ще откриете вашите места за{' '}
                        <span className="text-sky-400">риболов!</span>
                    </h2>

                    <Link
                        to="/city"
                        className="bg-emerald-400 self-center px-8 py-3 text-2xl rounded-full font-medium hover:bg-teal-600 duration-300 hover:scale-105"
                    >
                        Разгледай!
                    </Link>
                </article>
            </div>

            <article className="py-16">
                <h2 className="text-center max-md:text-2xl text-4xl max-md:mb-12 mb-24 relative">
                    Информация за над 25 места!
                    <div className="absolute top-[115%] left-2/4 -translate-x-2/4 -translate-y-1/2 max-md:w-40 w-60 h-0.5 bg-cyan-600"></div>
                </h2>

                <div className="w-full flex flex-wrap justify-center gap-12 w-3/5">
                    {cityCards.map((city) => (
                        <CityCard
                            key={city.cityName}
                            city={city.cityName}
                            linkTo={city.linkTo}
                            cityData={city.cityData}
                        />
                    ))}
                </div>
            </article>
        </main>
    );
};

export default Home;
