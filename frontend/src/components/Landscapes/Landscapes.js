import { useState } from 'react';
import LandscapeForm from "./LandscapeForm";


export default function Landscapes() {
    const [toggleForm, setToggleForm] = useState(false);

    return (
        <main>
            <div className="text-center py-4">
                <button
                    className="text-black bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:outline-none focus:ring-teal-300 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                    onClick={() => setToggleForm(!toggleForm)}
                >
                    {toggleForm ? "Скрий формата" : "Създай пейзаж!"}
                </button>
            </div>

            {toggleForm && <LandscapeForm />}
        </main>
    );
}