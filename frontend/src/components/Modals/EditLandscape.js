import { useState, useEffect } from 'react';
import Spinner from '../Spinner/Spinner';
import { editLandscape } from '../../services/landscapes';

const allowedCharactersPattern = /[^\w\s@А-я,.!?;:\-'"]/gm;

export default function EditLandscape({ data, closeModal, updateItemOnSuccessfulEdit }) {
    const [isLoading, setIsLoading] = useState(false);
    const [editTitle, setEditTitle] = useState(data.title);
    const [editDescription, setEditDescription] = useState(data.description);
    const [titleError, setTitleError] = useState("");
    const [descriptionError, setDescriptionError] = useState("");
    const [responseMsg, setResponseMsg] = useState({
        msg: "",
        textColor: "",
    });

    useEffect(() => {
        let intervalId;
        if (responseMsg) {
            intervalId = setInterval(() => {
                setResponseMsg(old => ({...old, msg: "", textColor: ""}));
            }, 5000);
        }

        return () => clearInterval(intervalId);

    }, [responseMsg])

    const оnChangeTextHandler = (
        e,
        textSetter,
        errorSetter
    ) => {
        const text = e.target.value;

        const sanitizedText = text.replace(allowedCharactersPattern, '');

        textSetter(sanitizedText);
        errorSetter(text !== sanitizedText ? 'Непозволен символ.' : '');
    };

    const handleSaveSubmission = async () => {
        const [trimmedTitle, trimmedDescription] = [editTitle.trim(), editDescription.trim()];

        const errors = [];
        if (!trimmedTitle.length) {
            setTitleError("Моля попълнете.");
            errors.push(true);
        }

        if (!trimmedDescription.length) {
            setDescriptionError("Моля попълнете.");
            errors.push(true);
        }

        if (errors.length) {
            return
        }

        setIsLoading(true);

        const response = await editLandscape(trimmedTitle, trimmedDescription, data.id);
        if (response.ok) {
            const data = await response.json();
            setResponseMsg(old => ({...old, msg: "Успешна промяна!", textColor: "bg-green-700"}));
            updateItemOnSuccessfulEdit(data.title, data.description, data.id);
        } else {
            setResponseMsg(old => ({...old, msg: "Неуспешна промяна.", textColor: "bg-red-700"}));
        }
        

        setIsLoading(false);
    }

    return (
        <article
            className="fixed top-0 left-0 bottom-0 right-0 bg-black/[.50]"
            onClick={() => closeModal()}
        >
            <div
                className="absolute left-2/4 top-2/4 bg-cyan-800 -translate-x-2/4 -translate-y-2/4 max-w-xs break-words p-4 rounded text-white"
                onClick={(e) => e.stopPropagation()}
                >
                
                <section className="relative">
                    <input className="text-xl text-black w-full rounded p-1"
                        value={editTitle}
                        onChange={(e) => оnChangeTextHandler(e, setEditTitle, setTitleError)}
                        maxLength={20}
                        autoFocus={true}
                        >
                    </input>
                    <i className="absolute right-[2%] top-[10px] text-black fa-solid fa-pencil pointer-events-none"></i>
                    {titleError && 
                        <p className="text-red-600 text-lg">
                            {titleError}
                        </p>
                    }
                    <p className="text-right mb-2">
                        {editTitle.length}/20
                    </p>

                </section>
                <div className="flex justify-center mb-3">
                    <img
                        className="rounded-lg h-[200px]"
                        src={data.image_url}
                        alt={data.title}
                        loading="lazy"
                    />
                </div>
                <section className="flex justify-between items-center">
                    <p>Описание:</p>
                    <i className="fa-solid fa-pencil"></i>
                </section>
                
                <textarea className="bg-white text-black rounded resize-none p-1 w-full overflow-auto"
                    value={editDescription}
                    onChange={(e) => оnChangeTextHandler(e, setEditDescription, setDescriptionError)}
                    maxLength={300}
                    rows={3}
                    >
                </textarea>
                {descriptionError && 
                    <p className="text-red-600 text-lg">
                        {descriptionError}
                    </p>
                    }
                <p className="text-right">
                    {editDescription.length}/300
                </p>
                <p className="text-lg">
                    Създадено на: {data.created_at}
                </p>
                <section className="flex justify-center flex-wrap items-center gap-20 py-6 font-medium text-3xl">
                    <button
                        className="bg-green-600 py-2 px-4 rounded-xl hover:bg-green-700"
                        onClick={handleSaveSubmission}
                        >
                        Запази!
                    </button>
                </section>

                {responseMsg.msg && 
                    <p className={`${responseMsg.textColor} text-center rounded font-medium`}>
                        {responseMsg.msg}
                    </p>
                }

                {isLoading && <Spinner />}
            </div>

            
        </article>
    );
}
