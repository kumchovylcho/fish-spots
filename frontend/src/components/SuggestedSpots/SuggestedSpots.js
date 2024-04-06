import FishPlacesCard from '../FishPlacesCard/FishPlacesCard';
import FishPlaceDetails from '../Modals/FishPlaceDetails';
import RegionChoice from '../RegionChoice/RegionChoice';
import ChoiceContainer from '../ChoiceContainer/ChoiceContainer';
import FilterFishSpots from '../FilterFishSpots/FilterFishSpots';
import Spinner from '../Spinner/Spinner';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getSuggestedSpots } from '../../services/fish-spots';
import setDocTitle from '../../util/setDocTitle';

export default function SuggestedSpots() {
    const city = useLocation();
    const searchParams = new URLSearchParams(city.search);
    const wantedRegion = searchParams.get('search');

    const [filteredSpots, setFilteredSpots] = useState([]);
    const [emptyFilter, setEmptyFilter] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [placeDetails, setPlaceDetails] = useState({});
    const [suggestedSpots, setSuggestedSpots] = useState([]);

    setDocTitle('Suggested Spots');

    useEffect(() => {
        setIsLoading(true);
        getSuggestedSpots(wantedRegion)
            .then((response) => {
                if (response.status === 400) {
                    throw new Error('Региона е невалиден.');
                }

                return response.json();
            })
            .then((data) => setSuggestedSpots(data))
            .catch((error) => {
                console.error(error.message);
            })
            .finally(() => setIsLoading(false));
    }, []);

    const filterFishSpots = (searchSpot) => {
        searchSpot = searchSpot.toLowerCase();
        const userFilterSpots = [];

        for (const data of suggestedSpots) {
            if (
                data.place.includes(searchSpot) ||
                data.bg_place_name.includes(searchSpot)
            ) {
                userFilterSpots.push(data);
            }
        }

        if (!userFilterSpots.length) {
            setEmptyFilter(true);
        } else if (userFilterSpots.length) {
            setFilteredSpots(userFilterSpots);
            setEmptyFilter(false);
        }
    };

    const openModal = (id) => {
        setIsModalOpen(true);

        const place = suggestedSpots.filter((obj) => obj.id === id)[0];

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

            {wantedRegion && <ChoiceContainer wantedCity={wantedRegion} />}

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

            {!isLoading && suggestedSpots.length ? (
                <>
                    {suggestedSpots.length && (
                        <FilterFishSpots filterFishSpots={filterFishSpots} />
                    )}

                    {emptyFilter && (
                        <p className="text-2xl font-medium text-center mb-4">
                            Няма намерени резултати.
                        </p>
                    )}

                    {!emptyFilter && (
                        <div className="max-w-7xl mx-auto grid grid-cols-4 max-[1000px]:grid-cols-3 max-md:grid-cols-2 max-[460px]:grid-cols-1 gap-12 py-8 px-4 bg-slate-400 rounded-xl mb-16">
                            {(filteredSpots.length
                                ? filteredSpots
                                : suggestedSpots
                            ).map((obj) => (
                                <FishPlacesCard
                                    key={obj.id}
                                    props={obj}
                                    modalOpen={openModal}
                                />
                            ))}
                        </div>
                    )}
                </>
            ) : (
                <h3 className="text-2xl py-12 text-center">
                    Няма предложени места или информацията е недостатъчна за да
                    се изчисли.
                </h3>
            )}

            <FishPlaceDetails
                data={placeDetails}
                isOpen={isModalOpen}
                closeModal={closeModal}
            />
        </main>
    );
}
