import RegionChoice from '../RegionChoice/RegionChoice';
import ChoiceContainer from '../ChoiceContainer/ChoiceContainer';
import FilterFishSpots from '../FilterFishSpots/FilterFishSpots';
import FishPlacesCard from '../FishPlacesCard/FishPlacesCard';
import FishPlaceDetails from '../Modals/FishPlaceDetails';
import FishSpotForm from './FishSpotForm';
import Spinner from '../Spinner/Spinner';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getFishPlaces } from '../../services/fish-spots';
import setDocTitle from '../../util/setDocTitle';

export default function FishSpots() {
    const city = useLocation();
    const searchParams = new URLSearchParams(city.search);
    const wantedRegion = searchParams.get('search');

    const region = wantedRegion === 'varna' ? 'north' : 'south';

    const [filteredSpots, setFilteredSpots] = useState([]);
    const [emptyFilter, setEmptyFilter] = useState(false);
    const [fishSpots, setFishSpots] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [placeDetails, setPlaceDetails] = useState({});

    setDocTitle('Fish Spots');

    useEffect(() => {
        getFishPlaces(region)
            .then((data) => setFishSpots(data))
            .catch((err) => {})
            .finally(() => setIsLoading(false));
    }, []);

    const filterFishSpots = (searchSpot) => {
        searchSpot = searchSpot.toLowerCase();
        const userFilterSpots = [];

        for (const data of fishSpots) {
            if (
                data.place.toLowerCase().includes(searchSpot) ||
                data.bg_place_name.toLowerCase().includes(searchSpot)
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

            {wantedRegion && <ChoiceContainer wantedCity={wantedRegion} />}

            <FishSpotForm />

            {isLoading && <Spinner />}

            {!isLoading && (
                <>
                    <FilterFishSpots filterFishSpots={filterFishSpots} />

                    {emptyFilter && (
                        <p className="text-2xl font-medium text-center mb-4">
                            Няма намерени резултати.
                        </p>
                    )}

                    {!emptyFilter && (
                        <div className="max-w-7xl mx-auto grid grid-cols-4 max-[1000px]:grid-cols-3 max-md:grid-cols-2 max-[460px]:grid-cols-1 gap-12 py-8 px-4 bg-slate-400 rounded-xl mb-16">
                            {(filteredSpots.length
                                ? filteredSpots
                                : fishSpots
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
            )}

            <FishPlaceDetails
                data={placeDetails}
                isOpen={isModalOpen}
                closeModal={closeModal}
            />
        </main>
    );
}
