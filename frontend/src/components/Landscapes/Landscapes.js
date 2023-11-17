import { useState, useEffect, useContext } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import LandscapeForm from "./LandscapeForm";
import { getLandscapePage } from '../../services/landscapes';
import Spinner from '../Spinner/Spinner';
import setDocumentTitle from '../../util/setDocTitle';
import AuthContext from '../../context/AuthContext';
import LandscapeDetails from '../Modals/LandscapeDetails';
import DeleteAsker from '../Modals/DeleteAsker';
import EditLandscape from '../Modals/EditLandscape';


export default function Landscapes() {
    setDocumentTitle("Landscapes");

    const navigate = useNavigate();

    const { user } = useContext(AuthContext);

    const [userCheckBox, setUserCheckBox] = useState(false);

    const [isLoading, setIsLoading] = useState(true);
    const [toggleForm, setToggleForm] = useState(false);
    const [pageResults, setPageResults] = useState([]);
    const [nextPage, setNextPage] = useState("");
    const [previousPage, setPreviousPage] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [landscapeShowItem, setLandscapeShowItem] = useState({});
    const [deleteModal, setDeleteModal] = useState({
        isOpened: false,
        deleteId: null,
    });
    const [editModal, setEditModal] = useState({
        isOpened: false,
        editData: null,
    });

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const currentPage = params.get('page') ? params.get('page') : "1";
    
    useEffect(() => {
        const fetchPage = async (page) => {
            setIsLoading(true);
            const userId = userCheckBox ? user.user_id : "";
            const response = await getLandscapePage(page, userId);
            if (response.ok) {
                const data = await response.json();
                setPageResults(data.results);
                setNextPage(data.next ? setUpPages(data.next) : "");
                setPreviousPage(data.previous ? setUpPages(data.previous) : "");          
            }
            setIsLoading(false);
        }

        fetchPage(currentPage);
    }, [currentPage, userCheckBox])

    const setUpPages = (pageUrl) => {
        const pagePattern = /page=\d+/;
        const getPage = pageUrl.match(pagePattern) || "page=1";
        return `${location.pathname}?${getPage}`;
    }

    const loadUserContent = () => {
        setUserCheckBox(!userCheckBox);
        navigate("/landscapes/?page=1");
    }

    const openModal = (landscapeId) => {
        setIsModalOpen(true);

        const landscapeItem = pageResults.filter(item => item.id === landscapeId)[0];
        setLandscapeShowItem(landscapeItem);
    }

    const closeModal = () => {
        setIsModalOpen(false);
        setLandscapeShowItem({});
    }

    const openDeleteModal = (id) => {
        setDeleteModal(old => {return {...old, isOpened: true, deleteId: id}})
    }

    const closeDeleteModal = (deletedItem=false) => {
        if (deletedItem) {
            setPageResults(old => old.filter(item => item.id !== deleteModal.deleteId));
        }

        setDeleteModal(old => {return {...old, isOpened: false, deleteId: null}});
    }

    const closeEditModal = () => {
        setEditModal(old => ({...old, isOpened: false, editData: null}));  
    }

    const updateItemOnSuccessfulEdit = (newTitle, newDescription, itemId) => {
        setPageResults(old => old.map(item => {
            if (item.id === itemId) {
                return {...item, title: newTitle, description: newDescription}
            }
            return item;
        }));
    }

    return (
        <main>
            {user && 
                <div className="text-center py-4">
                    <button
                        className="text-black bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:outline-none focus:ring-teal-300 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                        onClick={() => setToggleForm(!toggleForm)}
                    >
                        {toggleForm ? "Скрий формата" : "Създай пейзаж!"}
                    </button>
                </div>
            }

            {toggleForm && <LandscapeForm />}

            {user && 
                <section className="flex justify-center items-center gap-x-2">
                    <p className="text-xl">Покажи моите пейзажи: </p>
                    <input 
                        className="w-6 h-6" 
                        type="checkbox"
                        onClick={loadUserContent}
                        />
                </section>
            }

            {userCheckBox && isLoading && <Spinner />}


            {pageResults.length && 
                <>
                <div className="max-w-5xl mx-auto flex justify-center flex-wrap gap-12 py-8 bg-slate-400 rounded-xl my-8">
                    {pageResults.map(card => (
                                <section key={card.id} className="max-w-[224px] text-center rounded p-3 bg-cyan-950 shadow-2xl shadow-black">
                                <h3 className="font-medium mb-2 text-white">
                                    {card.title}
                                </h3>
                                <div className="h-[200px]">
                                    <img 
                                        className="rounded-t h-full"
                                        src={card.image_url}
                                        alt={card.title}
                                        loading="lazy"
                                    />
                                </div>
                                <section className="bg-white rounded-b py-2 max-h-[200px] px-1">
                                    <p className="mb-3 px-1 break-words">
                                        {card.description.slice(0, 50)}...
                                    </p>
                                    <section className="flex justify-center gap-2 text-xl">
                                        <button 
                                            className="basis-[28%] text-center bg-cyan-600 py-2 px-4 rounded-xl font-medium hover:bg-cyan-800"
                                            onClick={() => openModal(card.id)}
                                            >
                                            <i className="fa-solid fa-info"></i>
                                        </button>
                                        {user.username === card.author.username && 
                                            <button 
                                                className="basis-[28%] text-center bg-cyan-600 py-2 px-4 rounded-xl font-medium hover:bg-cyan-800"
                                                onClick={() => setEditModal(old => ({...old, isOpened: true,  editData: card}))}
                                                >
                                                <i className="fa-regular fa-pen-to-square"></i>
                                            </button>
                                        }
                                        {user.username === card.author.username && 
                                            <button 
                                                className="basis-[28%] text-center bg-cyan-600 py-2 px-4 rounded-xl font-medium hover:bg-cyan-800"
                                                onClick={() => openDeleteModal(card.id)}
                                                >
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
                                        }
                                    </section>
                                </section>
                            </section>
                    ))}
                </div>

                { isLoading && <Spinner />}

                <section className="max-w-xs mx-auto flex justify-center py-6">
                    <div className="bg-cyan-950 py-2 px-6 rounded text-white text-2xl">
                        {previousPage && 
                        <Link to={previousPage}>
                            <span className="bg-cyan-600 p-2 rounded inline-flex">
                                <i className="fa-solid fa-angles-left"></i>
                            </span>
                        </Link>
                        }

                        <span className="px-4">{currentPage}</span>
                        
                        {nextPage &&
                        <Link to={nextPage}>
                            <span className="bg-cyan-600 p-2 rounded inline-flex">
                                <i className="fa-solid fa-angles-right"></i>
                            </span>
                        </Link>
                        }
                    </div>
                </section>
                </>
            }

            
            <LandscapeDetails 
                data={landscapeShowItem}
                isOpen={isModalOpen}
                closeModal={closeModal} 
            />

            <DeleteAsker
                deleteId={deleteModal.deleteId}
                isOpen={deleteModal.isOpened}
                closeModal={closeDeleteModal}
            />

            <EditLandscape 
                data={editModal.editData}
                isOpen={editModal.isOpened}
                closeModal={closeEditModal}
                updateItemOnSuccessfulEdit={updateItemOnSuccessfulEdit}
            />
            

        </main>
    );
}