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
        className={({ isActive, isPending }) => isActive ? "text-[#FFC107] font-semibold md:p-0 block py-1 px-1 rounded" : isPending ? "" : "text-[#F5F5F5] hover:text-[#FFC107] md:p-0 block py-1 px-1 rounded"}
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
        <nav className="w-full start-0 border-b border-[#37474F]">
            {/* initial interface */}
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
                {/* left section */}
                <Link
                    to={"/"}
                    className='flex flex-col justify-center items-start gap-1 md:gap-2'
                >
                    <h2 className="text-center text-xl md:text-2xl lg:text-3xl text-[#FFC107] font-montserrat">VocabStar</h2>
                    <p className="text-sm md:text-base lg:text-lg text-gray-400 text-center font-open-sans">Learn to Never Forget!</p>
                </Link>

                {/* right section */}
                <div className="flex md:hidden md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    {/* page links */}
                    <button
                        onClick={toggleOpenClose}
                        data-collapse-toggle="navbar-sticky"
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-[#F5F5F5] rounded-lg md:hidden hover:bg-[#37474F] focus:outline-none focus:ring-2 focus:ring-[#1E88E5]"
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
                    <ul className="flex flex-col justify-center items-center gap-1 p-4 md:p-0 mt-4 font-medium rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
                        {
                            links.map((link, idx) => <li key={idx}>
                                <PageLink name={link.name} path={link.path} />
                            </li>)
                        }
                        {
                            isAuthenticated && <button
                                onClick={() => {
                                    logoutUser(dispatch);
                                    // toggleOpenClose(); // Not needed for desktop logout
                                }}
                                className='font-medium text-[#F5F5F5] border border-[#1E88E5] rounded-md px-3 py-1 hover:bg-[#1E88E5] hover:text-white'
                            >
                                Logout
                            </button>
                        }
                    </ul>
                </div>
            </div>

            {/* menu options (for mobile devices only) */}
            <div className={`${isMobileMenuOpen ? "" : "hidden"} items-center justify-between w-full md:hidden`} id="navbar-sticky">
                <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-[#37474F] rounded-lg bg-[#263238] md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
                    {
                        links.map((link, idx) => <li
                            key={idx}
                            onClick={toggleOpenClose}
                        >
                            <NavLink
                                to={link.path}
                                className={({ isActive, isPending }) => isActive ? "block py-2 px-3 text-[#FFC107] font-semibold rounded" : isPending ? "" : "block py-2 px-3 text-[#F5F5F5] rounded hover:bg-[#37474F] hover:text-[#FFC107]"}
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
                            className="block w-full text-left px-3 py-2 text-[#F5F5F5] rounded hover:bg-[#37474F] hover:text-[#FFC107]"
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