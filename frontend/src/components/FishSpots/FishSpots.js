import RegionChoice from '../RegionChoice/RegionChoice';
import ChoiceContainer from '../ChoiceContainer/ChoiceContainer';
import FilterFishSpots from '../FilterFishSpots/FilterFishSpots';
import FishPlacesCard from '../FishPlacesCard/FishPlacesCard';
import FishPlaceDetails from '../Modals/FishPlaceDetails';
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
    const [fishSpots, setFishSpots] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [placeDetails, setPlaceDetails] = useState({});

    setDocTitle("Fish Spots");

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
            if (!searchSpot) {
                break;
            }

            if (
                data.place.toLowerCase().includes(searchSpot) ||
                data.bg_place_name.toLowerCase().includes(searchSpot)
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

            {isLoading && <Spinner />}

            {!isLoading && (
                <>
                    <FilterFishSpots filterFishSpots={filterFishSpots} />

                    <div className="max-w-7xl mx-auto flex justify-center flex-wrap gap-12 py-8 bg-slate-400 rounded-xl mb-16">
                        {(filteredSpots.length ? filteredSpots : fishSpots).map(
                            (obj) => (
                                <FishPlacesCard
                                    key={obj.id}
                                    props={obj}
                                    modalOpen={openModal}
                                />
                            )
                        )}
                    </div>
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
