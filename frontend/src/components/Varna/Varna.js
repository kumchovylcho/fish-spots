import { useState, useEffect } from 'react';
import { getWeather } from '../../services/weather';
import RegionChoiceCard from '../RegionChoiceCard/RegionChoiceCard';
import TodayWeatherCard from '../TodayWeatherCard/TodayWeatherCard';

export default function Varna() {
    const [showData, setShowData] = useState({
        weather: true,
        fishSpots: false,
        suggestedSpots: false,
    });

    const [weatherData, setWeatherData] = useState({});

    useEffect(() => {
        getWeather('north', 'varna').then((data) => {
            setWeatherData((prevData) => {
                return { ...prevData, ...data };
            });
        });
    }, []);

    return (
        <main>
            <section className="text-center py-16 text-5xl">
                <h2>Регион Варна</h2>
            </section>
            <div className="flex flex-wrap justify-around max-w-7xl mx-auto text-2xl text-center bg-slate-500 text-black p-10 rounded-xl font-medium">
                <RegionChoiceCard
                    imgUrl="https://cdn.discordapp.com/attachments/1156335620919152650/1165310078774165575/weather.png?ex=65466295&is=6533ed95&hm=a87916564083109acf2ca9cd386299b8e8298147b255054b676fc8455f45473b&"
                    imgAlt="прогноза"
                    pText="Прогноза за времето"
                    dataKey="weather"
                    showData={showData}
                    setShowData={setShowData}
                />
                <RegionChoiceCard
                    imgUrl="https://cdn.discordapp.com/attachments/1156335620919152650/1165310390880714934/fish-rod.png?ex=654662df&is=6533eddf&hm=76ef89e86ef21eedecb16ae7637ae23cd5cddbe93c04eeec45f1dad6ce32ae38&"
                    imgAlt="въдица"
                    pText="Риболовни места"
                    dataKey="fishSpots"
                    showData={showData}
                    setShowData={setShowData}
                />
                <RegionChoiceCard
                    imgUrl="https://cdn.discordapp.com/attachments/1156335620919152650/1165310579825721456/spoticon.png?ex=6546630c&is=6533ee0c&hm=789298118befac39d5978b6954eab78850977cd54933dbce1cd2d4dcd3c33ec9&"
                    imgAlt="локация"
                    pText="Предложи ми място"
                    dataKey="suggestedSpots"
                    showData={showData}
                    setShowData={setShowData}
                />
            </div>

            <h3 className="max-w-7xl mx-auto text-center py-16 text-3xl relative">
                Прогноза за днес - Варна
                <div className="absolute top-[65%] left-2/4 -translate-x-2/4 -translate-y-1/2 w-40 h-0.5 bg-cyan-600"></div>
            </h3>

            {Object.keys(weatherData).length ? (
                <article className="max-w-screen-2xl mx-auto bg-cyan-700 py-7 rounded-xl">
                    <p className="text-center text-white text-2xl mb-8">
                        {weatherData.today.day_of_week}
                    </p>
                    <div className="flex justify-evenly flex-wrap">
                        {weatherData.today.list_hours.map((obj) => (
                            <TodayWeatherCard key={obj.id} props={obj} />
                        ))}
                    </div>
                    
                </article>
            ) : (
                ''
            )}
        </main>
    );
}
