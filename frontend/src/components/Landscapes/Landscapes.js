import { useState, useEffect, useContext } from 'react';
import { useLocation, Link } from 'react-router-dom';
import LandscapeForm from "./LandscapeForm";
import { getLandscapePage } from '../../services/landscapes';
import Spinner from '../Spinner/Spinner';
import setDocumentTitle from '../../util/setDocTitle';
import AuthContext from '../../context/AuthContext';


export default function Landscapes() {
    setDocumentTitle("Landscapes");

    const { user } = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(true);
    const [toggleForm, setToggleForm] = useState(false);
    const [pageResults, setPageResults] = useState([]);
    const [nextPage, setNextPage] = useState("");
    const [previousPage, setPreviousPage] = useState("");

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const currentPage = params.get('page') ? params.get('page') : "1";
    
    useEffect(() => {
        const fetchPage = async (page) => {
            setIsLoading(true);
            const response = await getLandscapePage(page);
            if (response.ok) {
                const data = await response.json();
                setPageResults(data.results);
                setNextPage(data.next ? setUpPages(data.next) : "");
                setPreviousPage(data.previous ? setUpPages(data.previous) : "");
            }
            setIsLoading(false);
        }

        fetchPage(currentPage);
    }, [currentPage])

    const setUpPages = (pageUrl) => {
        const pagePattern = /page=\d+/;
        const getPage = pageUrl.match(pagePattern) || "page=1";
        return `${location.pathname}?${getPage}`;
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
                                    <button 
                                        className="text-center bg-cyan-600 py-2 px-4 rounded-xl font-medium hover:bg-cyan-800"
                                        >
                                        Виж повече
                                    </button>
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

        </main>
    );
}