import { useState, useEffect } from 'react';
import { changeUserPassword } from '../../services/users';
import Spinner from '../Spinner/Spinner';


export default function ChangePassword({ username }) {
    const [isLoading, setIsLoading] = useState(false);

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [error, setError] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const [oldPasswordEye, setOldPasswordEye] = useState(false);
    const [newPasswordEye, setNewPasswordEye] = useState(false);
    const [confirmPasswordEye, setConfirmPasswordEye] = useState(false);

    useEffect(() => {
        let intervalId;
        if (successMsg) {
            intervalId = setInterval(() => {
                setSuccessMsg("");
            }, 5000);
        }

        return () => clearInterval(intervalId);

    }, [successMsg])

    const onFormSubmitHandler = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmNewPassword) {
            setError("Новата парола не съвпада.");
            return;
        }

        const options = {
            old_password: oldPassword,
            new_password: newPassword,
            confirm_password: confirmNewPassword
        };

        setIsLoading(true);

        const response = await changeUserPassword(username, options);
        const data = await response.json();
        if (response.ok) {
            resetFields();
            setSuccessMsg(data.message);
        } else {
            setError(data.error);
        }

        setIsLoading(false);
    }

    const resetFields = () => {
        setOldPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
    }

    const onChangePasswordHandler = (password, passwordSetter) => {
        passwordSetter(password);
        setError("");
    }

    return (
        <div className="max-md:text-center flex justify-center grow text-left max-w-2xl break-words text-white p-1 rounded bg-gradient-to-b from-sky-400 to-blue-500">
            <form onSubmit={onFormSubmitHandler} className="flex flex-col gap-5 w-3/4 py-2">
                <section className="flex flex-col items-center relative">
                    <label htmlFor="oldPassword">
                        Стара парола:
                    </label>
                    <input 
                        className="text-black rounded p-1 w-full"
                        type={oldPasswordEye ? "text" : "password"}
                        id="oldPassword"
                        placeholder="Стара парола.."
                        value={oldPassword}
                        onChange={(e) => onChangePasswordHandler(e.target.value, setOldPassword)}
                    />
                    <i
                        onClick={() => setOldPasswordEye(!oldPasswordEye)}
                        className={`text-black fa-solid ${oldPasswordEye ? "fa-eye" : "fa-eye-slash"} absolute right-4 bottom-[0.5rem] hover:cursor-pointer`}>
                    </i>
                </section>

                <section className="flex flex-col items-center relative">
                    <label htmlFor="newPassword">
                        Нова парола:
                    </label>
                    <input 
                        className="text-black rounded p-1 w-full"
                        type={newPasswordEye ? "text" : "password"}
                        id="newPassword"
                        placeholder="Нова парола.."
                        value={newPassword}
                        onChange={(e) => onChangePasswordHandler(e.target.value, setNewPassword)}
                    />
                    <i
                        onClick={() => setNewPasswordEye(!newPasswordEye)}
                        className={`text-black fa-solid ${newPasswordEye ? "fa-eye" : "fa-eye-slash"} absolute right-4 bottom-[0.5rem] hover:cursor-pointer`}>
                    </i>
                </section>

                <section className="flex flex-col items-center relative">
                    <label htmlFor="confirmPassword">
                        Потвърди паролата:
                    </label>
                    <input 
                        className="text-black rounded p-1 w-full"
                        type={confirmPasswordEye ? "text" : "password"}
                        id="confirmPassword"
                        placeholder="Нова парола.."
                        value={confirmNewPassword}
                        onChange={(e) => onChangePasswordHandler(e.target.value, setConfirmNewPassword)}
                    />
                    <i
                        onClick={() => setConfirmPasswordEye(!confirmPasswordEye)}
                        className={`text-black fa-solid ${confirmPasswordEye ? "fa-eye" : "fa-eye-slash"} absolute right-4 bottom-[0.5rem] hover:cursor-pointer`}>
                    </i>
                </section>

                {error.length > 0 && 
                    <p className="text-center text-red-900 font-medium">
                        {error}
                    </p>
                }

                {successMsg.length > 0 && 
                     <p className="font-medium py-1 px-2 bg-green-600 text-white text-center rounded mt-2">
                        {successMsg}
                    </p>
                }

                <section className="text-center">
                    <button
                        className="py-2 px-6 rounded-full bg-green-500 hover:bg-green-700"
                        >
                        Промени
                    </button>
                </section>

                {isLoading && <Spinner />}
            </form>
        </div>
    );
}