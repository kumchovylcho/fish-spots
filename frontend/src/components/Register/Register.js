import { useState } from 'react';
import { validateUsername, validateEmail } from '../../util/registrationValidator';
import FormError from '../FormError/FormError';


const Register = () => {
    const [passwordEye, setPasswordEye] = useState(false);
    const [rePasswordEye, setRePasswordEye] = useState(false);

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        rePassword: ""
    });

    const [errors, setErrors] = useState({
        username: "",
        email: "",
        password: "",
        rePassword: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
    
        const newErrors = {};
    
        if (formData.username.length < 3) {
            newErrors.username = "Името трябва да бъде минимум 3 латински букви.";
        } else if (!validateUsername(formData.username)) {
            newErrors.username = "Името може да има само букви, цифри и една долна черта.";
        }
    
        if (!validateEmail(formData.email)) {
            newErrors.email = 'Невалиден имейл адрес.';
        }
    
        if (formData.password.length < 6) {
            newErrors.password = 'Паролата трябва да съдържа поне 6 символа.';
        } else if (formData.password.length !== formData.rePassword.length) {
            newErrors.rePassword = "Дължината на паролите не съвпадат."
        } else if (formData.password !== formData.rePassword) {
            newErrors.rePassword = "Паролите не съвпадат."
        }
    

        setErrors(newErrors);
    
        if (Object.keys(newErrors).length === 0) {
            // send data to the server
            console.log('Form submitted with data:', formData);
        }
      };


    return (
        <article className="flex justify-center items-center p-16">
            <form onSubmit={handleSubmit} className="flex flex-col basis-1/4 gap-8 p-12 rounded-xl text-xl bg-white">
                <section className="flex flex-col gap-4">
                    <label className="font-medium" htmlFor="username">Потребителско име</label>
                    <input 
                        value={formData.username}
                        onChange={handleInputChange}
                        className="p-2 border-solid border-2 border-black rounded-xl" 
                        type="text" 
                        id="username"
                        name="username">
                    </input>
                    <FormError msg={errors.username}/>
                </section>

                <section className="flex flex-col gap-4">
                    <label className="font-medium" htmlFor="email">Имейл адрес</label>
                    <input 
                        value={formData.email}
                        onChange={handleInputChange}
                        className="p-2 border-solid border-2 border-black rounded-xl"
                        type="email" 
                        id="email"
                        name="email">
                    </input>
                    <FormError msg={errors.email}/>
                </section>

                <section className="flex flex-col gap-4">
                    <label className="font-medium" htmlFor="password">Парола</label>
                    <section className="flex relative items-center">
                        <input 
                            value={formData.password}
                            onChange={handleInputChange}                       
                            className="p-2 border-solid border-2 border-black rounded-xl w-full" 
                            type={passwordEye ? "text": "password"}
                            id="password"
                            name="password">
                        </input>
                        <i
                            onClick={() => setPasswordEye(!passwordEye)}
                            className={`fa-solid ${passwordEye ? "fa-eye" : "fa-eye-slash"} absolute right-6 bottom-[0.8rem] hover:cursor-pointer`}>
                        </i>
                    </section>
                    <FormError msg={errors.password}/>
                </section>

                <section className="flex flex-col gap-4">
                    <label className="font-medium" htmlFor="re-password">Повтори паролата</label>
                    <section className="flex relative items-center">
                        <input 
                            value={formData.rePassword}
                            onChange={handleInputChange}
                            className="p-2 border-solid border-2 border-black rounded-xl w-full" 
                            type={rePasswordEye ? "text": "password"}
                            id="re-password"
                            name="rePassword">
                        </input>
                        <i
                            onClick={() => setRePasswordEye(!rePasswordEye)}
                            className={`fa-solid ${rePasswordEye ? "fa-eye" : "fa-eye-slash"} absolute right-6 bottom-[0.8rem] hover:cursor-pointer`}>
                        </i>
                    </section>
                    <FormError msg={errors.rePassword}/>
                </section>

                <button 
                    className="bg-[#10ACDB] text-white rounded-xl p-4 hover:bg-cyan-800"
                    type="submit">
                    Регистрирай се
                </button>
            </form>
        </article>
    );
}


export default Register;