import FishPlacesCard from '../FishPlacesCard/FishPlacesCard';
import FishPlaceDetails from '../Modals/FishPlaceDetails';
import RegionChoice from '../RegionChoice/RegionChoice';
import ChoiceContainer from '../ChoiceContainer/ChoiceContainer';
import FilterFishSpots from '../FilterFishSpots/FilterFishSpots';
import Spinner from '../Spinner/Spinner';
import { getSuggestedSpots } from './getSuggestedSpots';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getFishPlaces } from '../../services/fish-spots';
import { getWeather } from '../../services/weather';
import setDocTitle from '../../util/setDocTitle';

export default function SuggestedSpots() {
    const city = useLocation();
    const searchParams = new URLSearchParams(city.search);
    const wantedRegion = searchParams.get('search');

    const regionForWeather = wantedRegion === 'varna' ? 'varna' : 'burgas';
    const regionForFishSpot = wantedRegion === 'varna' ? 'north' : 'south';

    const [filteredSpots, setFilteredSpots] = useState([]);
    const [fishSpots, setFishSpots] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [placeDetails, setPlaceDetails] = useState({});
    const [suggestedSpots, setSuggestedSpots] = useState([]);

    setDocTitle("Suggested Spots");

    useEffect(() => {
        const promises = [
            getWeather(regionForWeather),
            getFishPlaces(regionForFishSpot),
        ];

        Promise.all(promises)
            .then((results) => {
                const weatherData = results[0];
                const fishSpotData = results[1];

                setFishSpots(fishSpotData);
                setSuggestedSpots(getSuggestedSpots(weatherData, fishSpotData));
                setIsLoading(false);
            })


            .catch((err) => {});
    }, []);

    const filterFishSpots = (searchSpot) => {
        searchSpot = searchSpot.toLowerCase();
        const userFilterSpots = [];

        for (const data of fishSpots) {
            if (!searchSpot) {
                break;
            }

            if (
                data.place.includes(searchSpot) ||
                data.bg_place_name.includes(searchSpot)
            ) {
                userFilterSpots.push(data);
            }
        }

        setFilteredSpots(userFilterSpots);
    };

    const openModal = (id) => {
        setIsModalOpen(true);

        const place = fishSpots.filter((obj) => obj.id === id)[0];

        setPlaceDetails((oldPlace) => {
            return { ...oldPlace, ...place };
        });
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <main>
            <RegionChoice />

            {wantedRegion && (
                <ChoiceContainer
                    linkWeather={`/city/weather?search=${wantedRegion}`}
                    linkFishSpots={`/city/fish-spots?search=${wantedRegion}`}
                    linkSuggestedSpots={`/city/suggested-spots?search=${wantedRegion}`}
                />
            )}

            <h3 className="pb-4 text-2xl text-center">
                Предложените места са за{' '}
                <span className="text-4xl font-bold text-cyan-800">ДНЕС</span>{' '}
                на база на днешното време.
            </h3>
            <p className="text-center text-2xl pb-8">
                Информацията се обновява на всеки{' '}
                <span className="text-4xl font-bold text-cyan-800 animate-pulse">
                    3
                </span>{' '}
                часа.
            </p>

            {isLoading && <Spinner />}

            {!isLoading ? (
                <>
                    {suggestedSpots.length && <FilterFishSpots filterFishSpots={filterFishSpots} />}
                    
                    <div className="max-w-7xl mx-auto flex justify-center flex-wrap gap-12 py-8 bg-slate-400 rounded-xl mb-16 shadow-gray-900 shadow-2xl">
                        {(filteredSpots.length ? filteredSpots : suggestedSpots).map((obj) => (
                            <FishPlacesCard
                                key={obj.id}
                                props={obj}
                                modalOpen={openModal}
                            />
                        ))}
                    </div>
                </>
            ) : (
                <h3 className="text-2xl py-12 text-center">
                    Няма предложени места. Времето е бурно, стойте си вкъщи.
                </h3>
            )}

            {isModalOpen && (
                <FishPlaceDetails data={placeDetails} closeModal={closeModal} />
            )}
        </main>
    );
}
