import { useState, useEffect, useContext } from 'react';
import { createLandscape } from '../../services/landscapes';
import AuthContext from '../../context/AuthContext';
import Spinner from '../Spinner/Spinner';

const allowedCharactersPattern = /[^\w\s@А-я,.!?;:\-'"]/gm;

export default function LandscapeForm() {
    const { user } = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(false);

    const [descCharCounter, setDescCharCounter] = useState(0);
    const [description, setDescription] = useState('');

    const [titleCharCounter, setTitleCharCounter] = useState(0);
    const [title, setTitle] = useState('');

    const [descError, setDescError] = useState('');
    const [titleError, setTitleError] = useState('');
    const [imageError, setImageError] = useState('');
    const [formError, setFormError] = useState('');
    
    const [successMsg, setSuccessMsg] = useState(false);

    useEffect(() => {
        let intervalId;
        if (successMsg) {
            intervalId = setInterval(() => {
                setSuccessMsg(false);
            }, 5000);
        }

        return () => clearInterval(intervalId);

    }, [successMsg])

    const resetFields = () => {
        setDescription('');
        setTitle('');
        setDescError('');
        setTitleError('');
        setImageError('');
        setFormError('');
        setDescCharCounter(0);
        setTitleCharCounter(0);
    };

    const оnChangeTextHandler = (
        e,
        textSetter,
        charLengthSetter,
        errorSetter
    ) => {
        const text = e.target.value;

        const sanitizedText = text.replace(allowedCharactersPattern, '');

        textSetter(sanitizedText);
        charLengthSetter(sanitizedText.length);
        errorSetter(text !== sanitizedText ? 'Непозволен символ.' : '');
    };

    const onChangeImageHandler = (e) => {
        if (!e.target.files.length) {
            return;
        }

        const image = e.target.files[0];
        const maxTenMb = 1024 * 1024 * 10;

        const validImageTypes = ['png', 'jpg', 'jpeg'];
        const imageType = image.type.split('/')[1];
        if (!validImageTypes.includes(imageType)) {
            setImageError('Невалиден формат!');
            return;
        }

        if (image.size > maxTenMb) {
            setImageError('Макс. размер е 10мб!');
            return;
        }

        setImageError('');
        setFormError('');
    };

    const handleFormSubmission = async (e) => {
        e.preventDefault();

        const title = e.target.title.value;
        const description = e.target.description.value;
        const fileInput = e.target.file;

        if (!title.trim().length) {
            setTitleError('Моля попълнете.');
        }

        if (!description.trim().length) {
            setDescError('Моля попълнете.');
        }

        if (!fileInput.files.length) {
            setImageError('Моля изберете снимка.');
        }

        if (!title || !description || !fileInput.files.length) {
            return;
        }

        if (titleError || descError || imageError) {
            return;
        }

        const form = new FormData();
        form.append('title', title.trim());
        form.append('description', description.trim());
        form.append('image', fileInput.files[0]);
        form.append('user_id', user.user_id ? user.user_id : -1);

        setIsLoading(true);
        const response = await createLandscape(form);
        const data = await response.json();
        setIsLoading(false);

        if (response.status === 201) {
            resetFields();
            setSuccessMsg(true);
            
        } else if (response.status === 400) {
            setFormError(data.message);
        }
    };

    return (
        <div className="mx-auto flex justify-center text-white py-6">
            <form
                className="max-w-xl bg-slate-800 p-4 rounded-lg"
                encType="multipart/form-data"
                onSubmit={handleFormSubmission}
            >
                <section>
                    <label htmlFor="title">Заглавие:</label>
                    <input
                        className="block w-full rounded p-1.5 text-stone-950 outline-none"
                        name="title"
                        id="title"
                        maxLength="20"
                        onChange={(e) =>
                            оnChangeTextHandler(
                                e,
                                setTitle,
                                setTitleCharCounter,
                                setTitleError
                            )
                        }
                        value={title}
                    />
                    {titleError && (
                        <p className="text-red-600 text-lg">{titleError}</p>
                    )}
                    <p className="mb-4 text-end">{titleCharCounter}/20</p>

                    <label htmlFor="description">Описание на пейзажа:</label>
                    <textarea
                        className="block resize-none rounded p-1.5 text-stone-950 outline-none"
                        name="description"
                        id="description"
                        rows="5"
                        cols="25"
                        autoComplete="off"
                        autoCorrect="on"
                        maxLength="300"
                        onChange={(e) =>
                            оnChangeTextHandler(
                                e,
                                setDescription,
                                setDescCharCounter,
                                setDescError
                            )
                        }
                        value={description}
                    />
                    {descError && (
                        <p className="text-red-600 text-lg">{descError}</p>
                    )}
                    <p className="mb-4 text-end">{descCharCounter}/300</p>

                    <p>Избери снимка</p>
                    <input
                        className="block p-1 max-w-[200px] text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        id="file_input"
                        type="file"
                        name="file"
                        accept=".jpg, .jpeg, .png"
                        onChange={onChangeImageHandler}
                    />
                    {imageError && (
                        <p className="text-red-600 text-lg">{imageError}</p>
                    )}

                    <div className="text-center mt-4">
                        <button className="px-4 py-2 text-black font-medium rounded-lg bg-gradient-to-r from-green-200 via-green-400 to-green-500 hover:from-green-300 hover:via-green-500 hover:to-green-600">
                            Качи пейзаж!
                        </button>
                    </div>

                    {formError && (
                        <p className="text-center mt-4 text-red-600 text-lg">
                            {formError}
                        </p>
                    )}

                    {successMsg && 
                        <p className="font-medium py-1 bg-green-600 text-white text-center rounded mt-2">
                            Успешно качване!
                        </p>
                    }

                    {isLoading && <Spinner />}
                </section>
            </form>
        </div>
    );
}
