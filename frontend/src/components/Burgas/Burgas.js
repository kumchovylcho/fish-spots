import { useState, useEffect } from 'react';
import RegionChoiceCard from '../RegionChoiceCard/RegionChoiceCard';
import TodayWeatherCard from '../TodayWeatherCard/TodayWeatherCard';
import SelectCity from '../SelectCity/SelectCity';
import { getWeather } from '../../services/weather';
import { getFishPlaces } from '../../services/fish-spots';
import FishPlacesCard from '../FishPlacesCard/FishPlacesCard';
import FishPlaceDetails from '../Modals/FishPlaceDetails';
import SuggestedSpots from '../SuggestedSpots/SuggestedSpots';

export default function Burgas() {
    const [showData, setShowData] = useState({
        weather: false,
        fishSpots: false,
        suggestedSpots: false,
    });

    const [cityKey, setCityKey] = useState('');
    const [weatherData, setWeatherData] = useState({});
    const [fishSpots, setFishSpots] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [placeDetails, setPlaceDetails] = useState({});

    useEffect(() => {     
        getWeather().then((data) => {
            setWeatherData((prevData) => {
                return { ...prevData, ...data };
            });
        });
        
        if (!fishSpots) {
            getFishPlaces('south').then((data) => {
                setFishSpots(data);
            });
        }
    }, [cityKey]);

    const resetCityKey = () => {
        setCityKey("");
    }

    const openModal = (id) => {
        setIsModalOpen(true);

        const place = fishSpots.filter((obj) => obj.id === id)[0];

        setPlaceDetails((oldPlace) => {
            return { ...oldPlace, ...place }
        })
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    function renderTodayWeatherCard(data, showSunset = false) {
        return (
            <>
                <p className="text-center text-white text-2xl mb-3">
                    {data.day_of_week}
                </p>
                <p className="text-center text-white text-2xl mb-8">
                    {data.today_date}
                </p>
                {showSunset ? (
                    <section className="flex justify-center gap-10">
                        <p className="text-white text-2xl">
                            Изгрев в {data.sunrise}ч
                        </p>
                        <p className="text-white text-2xl mb-8">
                            Залез в {data.sunset}ч
                        </p>
                    </section>
                ) : (
                    ''
                )}

                <div className="flex justify-center gap-3 flex-wrap mb-12">
                    {data.list_hours.map((obj) => (
                        <TodayWeatherCard key={obj.id} props={obj} />
                    ))}
                </div>
            </>
        );
    }

    return (
        <main>
            <section className="text-center py-16 text-5xl">
                <h2>Регион Бургас</h2>
            </section>
            <div className="flex flex-wrap justify-around max-w-7xl mx-auto text-2xl text-center bg-slate-500 text-black p-10 mb-20 rounded-xl font-medium">
                <RegionChoiceCard
                    imgUrl="https://cdn.discordapp.com/attachments/1156335620919152650/1165310078774165575/weather.png?ex=65466295&is=6533ed95&hm=a87916564083109acf2ca9cd386299b8e8298147b255054b676fc8455f45473b&"
                    imgAlt="прогноза"
                    pText="Прогноза за времето"
                    dataKey="weather"
                    showData={showData}
                    setShowData={setShowData}
                    resetCityKey={resetCityKey}
                />
                <RegionChoiceCard
                    imgUrl="https://cdn.discordapp.com/attachments/1156335620919152650/1165310390880714934/fish-rod.png?ex=654662df&is=6533eddf&hm=76ef89e86ef21eedecb16ae7637ae23cd5cddbe93c04eeec45f1dad6ce32ae38&"
                    imgAlt="въдица"
                    pText="Риболовни места"
                    dataKey="fishSpots"
                    showData={showData}
                    setShowData={setShowData}
                    resetCityKey={resetCityKey}
                />
                <RegionChoiceCard
                    imgUrl="https://cdn.discordapp.com/attachments/1156335620919152650/1165310579825721456/spoticon.png?ex=6546630c&is=6533ee0c&hm=789298118befac39d5978b6954eab78850977cd54933dbce1cd2d4dcd3c33ec9&"
                    imgAlt="локация"
                    pText="Предложи ми място"
                    dataKey="suggestedSpots"
                    showData={showData}
                    setShowData={setShowData}
                    resetCityKey={resetCityKey}
                />
            </div>

            {showData.weather && (
                <SelectCity
                    city1={'Бургас'}
                    city2={'Черноморец'}
                    city3={'Приморско'}
                    setCityKey={setCityKey}
                />
            )}

            {Object.keys(weatherData).length && showData.weather ? (
                <>
                    {cityKey ? (
                        <>
                            <article className="max-w-screen-2xl mx-auto bg-cyan-700 rounded-xl mb-32">
                                <h3 className="max-w-7xl mx-auto text-center py-10 text-3xl relative">
                                    Прогноза за днес -{' '}
                                    {
                                        weatherData.burgas[cityKey].today
                                            .bg_name_place
                                    }
                                    <div className="absolute top-[75%] left-2/4 -translate-x-2/4 -translate-y-1/2 w-60 h-0.5 bg-white"></div>
                                </h3>
                                {renderTodayWeatherCard(
                                    weatherData.burgas[cityKey].today,
                                    true
                                )}
                            </article>

                            <article className="max-w-screen-2xl mx-auto bg-cyan-700 py-7 rounded-xl mb-32">
                                <h3 className="max-w-7xl mx-auto text-center py-10 text-3xl relative">
                                    4 дневна прогноза
                                    <div className="absolute top-[75%] left-2/4 -translate-x-2/4 -translate-y-1/2 w-40 h-0.5 bg-white"></div>
                                </h3>
                                {renderTodayWeatherCard(
                                    weatherData.burgas[cityKey].four_days
                                        .first_day
                                )}
                                {renderTodayWeatherCard(
                                    weatherData.burgas[cityKey].four_days
                                        .second_day
                                )}
                                {renderTodayWeatherCard(
                                    weatherData.burgas[cityKey].four_days
                                        .third_day
                                )}
                                {renderTodayWeatherCard(
                                    weatherData.burgas[cityKey].four_days
                                        .fourth_day
                                )}
                            </article>
                        </>
                    ) : (
                        ''
                    )}
                </>
            ) : (
                ''
            )}

            {showData.fishSpots && fishSpots ? 
                (
                    <div className="max-w-7xl mx-auto flex justify-center flex-wrap gap-12 py-8 bg-slate-400 rounded-xl mb-16">
                        {fishSpots.map((obj) =>           
                            <FishPlacesCard key={obj.id} props={obj} modalOpen={openModal}/>                         
                        )}
                    </div>
                )
                : ''
            }

            {isModalOpen && <FishPlaceDetails data={placeDetails} closeModal={closeModal}/>}

            {Object.keys(weatherData).length && showData.suggestedSpots &&
                <SuggestedSpots 
                    weatherData={weatherData.burgas}
                    fishSpots={fishSpots}
                    modalOpen={openModal}
                />
            }  
        </main>
    );
}
