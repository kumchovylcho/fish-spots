import { useLocation, useNavigate } from 'react-router-dom';


export default function RegionChoice() {
    const city = useLocation();
    const searchParams = new URLSearchParams(city.search);
    const wantedCity = searchParams.get('search');

    const navigate = useNavigate();

    const handleCitySelect = (e) => {
        const query = `search=${e.target.name}`;
        navigate(`/city?${query}`);
    };

    return (
        <section className="flex items-center flex-col gap-8 py-16 text-5xl">
            <h2 className="max-md:text-center">Избери регион</h2>
            <section className="inline-flex gap-10 text-black text-2xl">
                <button
                    className={`bg-gradient-to-r from-sky-400 to-blue-500 py-3 px-6 rounded-lg hover:opacity-90 duration-75 ${wantedCity === "varna" ? "outline" : ""}`}
                    name="varna"
                    onClick={handleCitySelect}
                    >
                    Варна
                </button>
                <button
                    className={`bg-gradient-to-r from-sky-400 to-blue-500 py-3 px-6 rounded-lg hover:opacity-90 duration-75 ${wantedCity === "burgas" ? "outline" : ""}`}
                    name="burgas"
                    onClick={handleCitySelect}
                    >
                    Бургас
                </button>
            </section>
        </section>
    );
}