import RegionChoice from '../RegionChoice/RegionChoice';
import ChoiceContainer from '../ChoiceContainer/ChoiceContainer';
import FilterFishSpots from '../FilterFishSpots/FilterFishSpots';
import FishPlacesCard from '../FishPlacesCard/FishPlacesCard';
import FishPlaceDetails from '../Modals/FishPlaceDetails';
import FishSpotForm from './FishSpotForm';
import Spinner from '../Spinner/Spinner';
import { useLocation } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { getFishPlaces, deleteFishPlace } from '../../services/fish-spots';
import setDocTitle from '../../util/setDocTitle';
import AuthContext from '../../context/AuthContext';
import DeleteAsker from '../Modals/DeleteAsker.js';

export default function FishSpots() {
    const { isLogged } = useContext(AuthContext);
    const city = useLocation();
    const searchParams = new URLSearchParams(city.search);
    const wantedRegion = searchParams.get('search');

    const [filteredSpots, setFilteredSpots] = useState([]);
    const [emptyFilter, setEmptyFilter] = useState(false);
    const [fishSpots, setFishSpots] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [placeDetails, setPlaceDetails] = useState({});

    const [formOpen, setFormOpen] = useState(false);
    const [deleteModal, setDeleteModal] = useState({
        isOpened: false,
        deleteId: null,
        isLoading: false,
    });

    setDocTitle('Fish Spots');

    useEffect(() => {
        getFishPlaces(wantedRegion)
            .then((data) => setFishSpots(data))
            .catch((err) => {})
            .finally(() => setIsLoading(false));
    }, []);

    const addNewPlace = (placeObj) => {
        setFishSpots((currentSpots) => [placeObj, ...currentSpots]);
    };

    const handleDeleteModal = (newProps) => {
        setDeleteModal((oldProps) => {
            return { ...oldProps, ...newProps };
        });
    };

    const deleteOnAgree = () => {
        handleDeleteModal({ isLoading: true });
        deleteFishPlace(deleteModal.deleteId)
            .then((response) => {
                if (response.status === 204) {
                    removeFishPlaceAfterDeletion(deleteModal.deleteId);
                    handleDeleteModal({ isOpened: false, deleteId: null });
                }
            })
            .catch((error) => {})
            .finally(() => {
                handleDeleteModal({ isLoading: false });
            });
    };

    const removeFishPlaceAfterDeletion = (placeId) => {
        setFishSpots((spots) => spots.filter((spot) => spot.id !== placeId));
    };

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

            {isLogged && (
                <>
                    <section
                        className={`flex justify-center ${
                            formOpen ? '' : 'mb-10'
                        }`}
                    >
                        <button
                            type="button"
                            className="px-6 py-3.5 text-base font-medium text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={() => setFormOpen((isOpen) => !isOpen)}
                        >
                            {formOpen ? 'Скрий формата' : 'Създай място'}
                        </button>
                    </section>
                    <FishSpotForm
                        showForm={formOpen}
                        addNewPlaceHandler={addNewPlace}
                    />
                </>
            )}

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
                                    isLogged={isLogged}
                                    openDeleteModal={() =>
                                        handleDeleteModal({
                                            isOpened: true,
                                            deleteId: obj.id,
                                        })
                                    }
                                    modalOpen={openModal}
                                />
                            ))}
                        </div>
                    )}
                </>
            )}

            {isLogged && (
                <DeleteAsker
                    isOpen={deleteModal.isOpened}
                    deleteOnAgree={deleteOnAgree}
                    closeModal={() =>
                        handleDeleteModal({ isOpened: false, deleteId: null })
                    }
                    isLoading={deleteModal.isLoading}
                />
            )}

            <FishPlaceDetails
                data={placeDetails}
                isOpen={isModalOpen}
                closeModal={closeModal}
            />
        </main>
    );
}
