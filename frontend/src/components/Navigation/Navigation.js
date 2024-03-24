import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Hamburger from './Hamburger';

const navigationLinks = {
    cssClasses: "hover:text-stone-300 duration-300",
    links: [
        {linkTo: "/city", text: "Градове"},
    ]
};

const Navigation = () => {
    const [hamburgerOpen, setHamburgerOpen] = useState(false);

    const handleHamburgerMenu = () => { // used for when the hamburger menu is clicked
        const isOpen = !hamburgerOpen;

        if (isOpen) {
            document.body.classList.add("overflow-hidden");
        } else if (!isOpen) {
            document.body.classList.remove("overflow-hidden");
        }

        setHamburgerOpen(isOpen);
    }

    const handleCloseHamburgerMenu = () => { // used for closing the menu when the click is outside or when you click a link
        setHamburgerOpen(false);
        document.body.classList.remove("overflow-hidden");
    }

    useEffect(() => {
        const handleClickOutside = event => {
            if (!event.target.closest('.click-outside')) {
                handleCloseHamburgerMenu();
            }
        };

        if (hamburgerOpen) {
            document.addEventListener('click', handleClickOutside);
        } else {
            document.removeEventListener('click', handleClickOutside);
        }

        return () => document.removeEventListener('click', handleClickOutside);

    }, [hamburgerOpen]);

    return (
        <header className="flex md:justify-center p-6 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium text-2xl">
            <nav className="max-w-screen-2xl flex md:justify-between max-md:items-center md:w-5/6 max-md:w-full click-outside">
                <Hamburger 
                    isOpen={hamburgerOpen} 
                    handleHamburgerMenu={handleHamburgerMenu} 
                />
                
                <section className="max-md:w-full max-md:text-center">
                    <Link 
                        onClick={handleCloseHamburgerMenu} 
                        className={navigationLinks.cssClasses} 
                        to="/"
                        >
                        Риболовни места
                    </Link>
                </section>

                <ul className="flex gap-12 flex-wrap max-md:hidden">
                    {navigationLinks.links.map(link => (
                        <li key={link.text}>
                            <Link 
                                className={navigationLinks.cssClasses} 
                                to={link.linkTo}
                                >
                                {link.text}
                            </Link>
                        </li>
                    ))}
                </ul>

                <ul
                    className={`z-50 overflow-auto flex flex-col gap-5 fixed top-[80px] left-0 bottom-0 w-60 p-4 text-white font-medium text-2xl bg-slate-900 rounded-r-lg ease-in-out transition-opacity duration-300 ${hamburgerOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                    >
                    {navigationLinks.links.map(link => (
                        <li 
                            key={link.text} 
                            className="border-b-2 border-red-900"
                            onClick={handleCloseHamburgerMenu}
                            >
                            <Link 
                                className={navigationLinks.cssClasses}
                                to={link.linkTo}
                                >
                                {link.text}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}

export default Navigation;