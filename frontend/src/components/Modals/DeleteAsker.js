import { useState } from "react";
import { deleteLandscape } from "../../services/landscapes";
import Spinner from "../Spinner/Spinner";


export default function DeleteAsker({ deleteId, closeModal }) {
    const [isLoading, setIsLoading] = useState(false);

    const deleteHandler = async () => {
        setIsLoading(true);

        const response = await deleteLandscape(deleteId);
        closeModal(response.status === 204 ? true : false);

        setIsLoading(false);
    }

    return (
        <article
            className="fixed top-0 left-0 bottom-0 right-0 bg-black/[.50]"
            onClick={closeModal}
        >
            <div
                className="absolute left-2/4 top-2/4 bg-cyan-800 -translate-x-2/4 -translate-y-2/4 max-w-xs break-words p-4 rounded text-white"
                onClick={(e) => e.stopPropagation()}
                >
                
                <section className="text-2xl text-center">
                    <h3 className="mb-4 font-bold">
                        ИЗТРИВАНЕ
                    </h3>
                    <p>
                        Сигурен ли си ,че искаш да изтриеш?
                    </p>
                </section>

                <section className="flex justify-center flex-wrap items-center gap-8 py-6 text-white font-medium text-3xl">
                    <button
                        className="bg-red-800 py-2 px-4 rounded-xl hover:bg-red-900"
                        onClick={deleteHandler}
                        >
                        Да!
                    </button>

                    <button
                        className="bg-green-700 py-2 px-4 rounded-xl hover:bg-green-800"
                        onClick={() => closeModal()}
                        >
                        Затвори
                    </button>
                </section>

                {isLoading && <Spinner />}
            </div>    
        </article>
    );
}
