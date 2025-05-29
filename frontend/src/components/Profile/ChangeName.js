import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import {
    changeUserData,
    createNewToken,
    userExistsData,
} from '../../services/users';

export default function ChangeName({ username, setAuthTokens, setUser }) {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [newName, setNewName] = useState('');
    const [error, setError] = useState('');
    const [password, setPassword] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [passwordEye, setPasswordEye] = useState(false);

    useEffect(() => {
        let intervalId;
        if (successMsg) {
            intervalId = setInterval(() => {
                setSuccessMsg('');
            }, 5000);
        }

        return () => clearInterval(intervalId);
    }, [successMsg]);

    const onFormSubmitHandler = async (e) => {
        e.preventDefault();
        setError('');

        if (!password.length) {
            setError('Моля попълнете паролата.');
            return;
        }

        setIsLoading(true);
        const checkUsernameResponse = await userExistsData({
            username: newName,
            old_username: username,
            password: password,
            check_password: true,
        });
        if (checkUsernameResponse.status === 200) {
            setError(`${newName} е заето.`);
            setIsLoading(false);
            return;
        } else if (checkUsernameResponse.status === 401) {
            setError('Грешна парола.');
            setIsLoading(false);
            return;
        }

        const response = await changeUserData(username, { username: newName });
        if (response.ok) {
            const data = await response.json();
            await createNewToken(
                { username: data.username, password: password },
                setAuthTokens,
                setUser
            );
            navigate(`/profile/${data.username}`);
            setNewName('');
            setPassword('');
            setSuccessMsg('Успешна промяна!');
        } else {
            setError('Невалидни инициали.');
        }
        setIsLoading(false);
    };

    const OnChangeUsernameHandler = (e) => {
        // const currentName = e.target.value;
        // const isValid = validateUsername(currentName);
        // if (isValid || !currentName.length) {
        //     setNewName(currentName);
        //     setError('');
        // } else {
        //     setError(
        //         `${currentName[currentName.length - 1]} не е позволен символ.`
        //     );
        // }
    };

    return (
        <div className="max-md:text-center flex justify-center grow text-left max-w-2xl break-words text-white p-2 rounded bg-gradient-to-b from-sky-400 to-blue-500">
            <form
                className="w-3/4 flex flex-col items-center gap-5"
                onSubmit={onFormSubmitHandler}
            >
                <section className="w-full">
                    <label className="block text-center" htmlFor="newUsername">
                        Ново потребителско име:
                    </label>
                    <input
                        className="p-1 w-full rounded text-black"
                        id="newUsername"
                        type="text"
                        placeholder="Пешо.."
                        name="username"
                        value={newName}
                        onChange={OnChangeUsernameHandler}
                    />
                </section>

                <section className="relative flex flex-col w-full">
                    <label className="block text-center" htmlFor="password">
                        Потвърди паролата:
                    </label>
                    <input
                        className="p-1 w-full rounded text-black"
                        type={passwordEye ? 'text' : 'password'}
                        id="password"
                        name="password"
                        placeholder="Парола.."
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setError('');
                        }}
                    />
                    <i
                        onClick={() => setPasswordEye(!passwordEye)}
                        className={`text-black fa-solid ${
                            passwordEye ? 'fa-eye' : 'fa-eye-slash'
                        } absolute right-4 bottom-[0.5rem] hover:cursor-pointer`}
                    ></i>
                </section>
                {error.length > 0 && (
                    <p className="text-red-900 font-medium">{error}</p>
                )}

                <button className="py-2 px-6 rounded-full bg-green-500 hover:bg-green-700">
                    Промени
                </button>

                {successMsg.length > 0 && (
                    <p className="font-medium py-1 px-2 bg-green-600 text-white text-center rounded mt-2">
                        {successMsg}
                    </p>
                )}

                {isLoading && <Spinner />}
            </form>
        </div>
    );
}
