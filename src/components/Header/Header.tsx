import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { logoutUser } from '../../features/auth/authActions';

interface PageLinkProps {
    name: string;
    path: string;
};

const PageLink = ({ name, path }: PageLinkProps) => {
    return <NavLink
        to={path}
        className={({ isActive, isPending }) => isActive ? "text-blue-500 md:p-0 dark:border-gray-700 block py-1 px-1 rounded" : isPending ? "" : "text-gray-900 dark:text-white hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-500 md:p-0 md:dark:hover:text-blue-300 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 block py-1 px-1 rounded"}
    >
        {name}
    </NavLink>
}

const Header = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


    const links = [
        {
            name: "Home",
            path: "/",
        },
        {
            name: "My Vocabs",
            path: "/my_vocabs",
        },
        {
            name: "Take Test",
            path: "/take_test",
        }
    ]

    // handler for toggling mobile menu
    const toggleOpenClose = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    }

    return (
        <nav className="w-full start-0 border-b border-gray-200 dark:border-gray-600">
            {/* initial interface */}
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
                {/* left section */}
                <Link
                    to={"/"}
                    className='flex flex-col justify-center items-start gap-1 md:gap-2'
                >
                    <h2 className="text-center text-xl md:text-2xl lg:text-3xl text-app_name font-ubuntu">VocabStar</h2>
                    <p className="text-sm md:text-base lg:text-lg text-border_color text-center font-mono">Learn to Never Forget!</p>
                </Link>

                {/* right section */}
                <div className="flex md:hidden md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    {/* page links */}
                    <button
                        onClick={toggleOpenClose}
                        data-collapse-toggle="navbar-sticky"
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-sticky"
                        aria-expanded="false"
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                </div>

                {/* middle section (for tablet or larger devices only) */}
                <div className="w-full md:w-auto hidden md:flex items-center justify-between md:order-1" id="navbar-sticky">
                    <ul className="flex flex-col justify-center items-center gap-1 p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:border-gray-700">
                        {
                            links.map((link, idx) => <li key={idx}>
                                <PageLink name={link.name} path={link.path} />
                            </li>)
                        }
                        {
                            isAuthenticated && <button
                                onClick={() => {
                                    logoutUser(dispatch);
                                    toggleOpenClose();
                                }}
                                className='border border-border_color rounded-md text-white px-3 py-2 hover:bg-bg_color'
                            >
                                Logout
                            </button>
                        }
                    </ul>
                </div>
            </div>

            {/* menu options (for mobile devices only) */}
            <div className={`${isMobileMenuOpen ? "" : "hidden"} items-center justify-between w-full md:hidden`} id="navbar-sticky">
                <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                    {
                        links.map((link, idx) => <li
                            key={idx}
                            onClick={toggleOpenClose}
                        >
                            <NavLink
                                to={link.path}
                                className={({ isActive, isPending }) => isActive ? "block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" : isPending ? "" : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"}
                            >
                                {link.name}
                            </NavLink>
                        </li>)
                    }
                    {
                        isAuthenticated && <button
                            onClick={() => {
                                logoutUser(dispatch);
                                toggleOpenClose();
                            }}
                            className="px-3 py-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                        >
                            Logout
                        </button>
                    }
                </ul>
            </div>
        </nav>

    )
};

export default Header;