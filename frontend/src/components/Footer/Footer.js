import { Link } from 'react-router-dom';


const Footer = () => {

    return (
        <footer className="bg-gray-700 p-5 mt-auto">
            <div className="max-w-screen-2xl mx-auto flex justify-center text-white">
                <section>
                    <h3 className="flex justify-center gap-x-1 mb-4">
                        Рибарски групи
                        <span><i className="text-cyan-600 fa-brands fa-facebook"></i></span>
                    </h3>
                    <ul className="flex flex-col items-center text-cyan-400">
                        <li className="hover:text-cyan-600 duration-150">
                            <Link 
                                to="https://www.facebook.com/groups/338746856576368" 
                                target='_blank'>
                                Морски риболов
                            </Link>
                        </li>
                        <li className="hover:text-cyan-600 duration-150">
                            <Link 
                                to="https://www.facebook.com/groups/643789872697112" 
                                target='_blank'>
                                Морски риболов - Варна
                            </Link>
                        </li>
                        <li className="hover:text-cyan-600 duration-150">
                            <Link 
                                to="https://www.facebook.com/groups/288897695142823" 
                                target='_blank'>
                                Черноморски риболов
                            </Link>
                        </li>
                    </ul>
                </section>
            </div>
        </footer>
    );

}


export default Footer;