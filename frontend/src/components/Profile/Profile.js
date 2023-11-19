import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { userExistsData } from '../../services/users';
import Spinner from '../Spinner/Spinner';
import AuthContext from '../../context/AuthContext';
import GeneralProfileInfo from './GeneralProfileInfo';
import ChangeName from './ChangeName';


export default function Profile() {
    const navigate = useNavigate();
    
    const { username } = useParams();
    const { user, setAuthTokens, setUser } = useContext(AuthContext);

    const [activeBtn, setActiveBtn] = useState({
        general: true,
        changeName: false,
        changePass: false
    });
    const [isLoading, setIsLoading] = useState(false);
    const [userInfo, setUserInfo] = useState({
        username: "",
        email: "",
        number_of_created_landscapes: "",
    });

    useEffect(() => {
        const getUserData = async () => {
            setIsLoading(true);
            const response = await userExistsData({username});
            if (response.ok) {
                const data = await response.json();
                setUserInfo(old => ({...old, ...data}));
            } else {
                navigate("/404");
            }
            setIsLoading(false);
        }

        getUserData();
    }, [username])

    const markActiveButton = (obj) => {
        setActiveBtn(old => {
            const updatedActiveButtons = {};
            Object.keys(old).forEach(key => {
                updatedActiveButtons[key] = false;
            })

            return {...updatedActiveButtons, ...obj};
        })
    }

    return (
        <main>
            {isLoading && <Spinner />}

            <div className="max-md:flex-col max-md:items-center py-5 flex justify-center mx-auto max-w-5xl gap-5 text-2xl">
                <div className="p-2 max-w-xs rounded bg-gradient-to-b from-sky-400 to-blue-500">
                    <section className="flex flex-col gap-5">
                        <p 
                            className={`cursor-pointer ${activeBtn.general ? "bg-white rounded-full" : "hover:bg-white hover:rounded-full hover:scale-105 duration-300"}`}
                            onClick={() => markActiveButton({general: true})}
                            >
                            Обща информация
                        </p>
                        {user.username === userInfo.username && 
                            <>
                                <p
                                    className={`cursor-pointer ${activeBtn.changeName ? "bg-white rounded-full" : "hover:bg-white hover:rounded-full hover:scale-105 duration-300"}`}
                                    onClick={() => markActiveButton({changeName: true})}
                                    >
                                    Смени потребителско име
                                </p>
                                <p  
                                    className={`cursor-pointer ${activeBtn.changePass ? "bg-white rounded-full" : "hover:bg-white hover:rounded-full hover:scale-105 duration-300"}`}
                                    onClick={() => markActiveButton({changePass: true})}
                                    >
                                    Смени парола
                                    </p>
                            </>
                        }
                    </section>
                </div>       

                {activeBtn.general &&
                    <GeneralProfileInfo
                        username={userInfo.username}
                        email={userInfo.email}
                        createdLandscapes={userInfo.number_of_created_landscapes}
                        showEmail={user.username === userInfo.username} 
                        />
                }

                {activeBtn.changeName &&
                    <ChangeName 
                        username={user.username}
                        setAuthTokens={setAuthTokens}
                        setUser={setUser}
                        />

                }
            </div>
        </main>
    );
}