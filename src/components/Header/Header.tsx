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
    // Updated styles for PageLink using new theme
    return <NavLink
        to={path}
        className={({ isActive }) =>
            `block py-2 px-3 rounded md:p-0 font-sans ${ // Added font-sans
                isActive
                    ? "text-secondary"
                    : "text-neutral-50 hover:text-secondary" // Changed text-neutral-100 to text-neutral-50
            }`
        }
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
        <nav className="w-full start-0 bg-primary"> {/* Applied primary background, removed border */}
            {/* initial interface */}
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"> {/* Increased padding */}
                {/* left section */}
                <Link
                    to={"/"}
                    className='flex flex-col justify-center items-start gap-1 md:gap-2'
                >
                    <h2 className="text-center text-xl md:text-2xl lg:text-3xl text-neutral-50 font-heading">VocabStar</h2> {/* Changed text-neutral-100 to text-neutral-50 */}
                    <p className="text-sm md:text-base lg:text-lg text-neutral-200 text-center font-sans">Learn to Never Forget!</p> {/* text-neutral-200 is fine */}
                </Link>

                {/* right section - Hamburger Menu Button */}
                <div className="flex md:hidden md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <button
                        onClick={toggleOpenClose}
                        data-collapse-toggle="navbar-sticky"
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-neutral-50 rounded-lg md:hidden hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-secondary" // Changed text-neutral-100 to text-neutral-50 and focus ring
                        aria-controls="navbar-sticky"
                        aria-expanded="false"
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                </div>

                {/* middle section (for tablet or larger devices only) - Desktop Navigation */}
                <div className="w-full md:w-auto hidden md:flex items-center justify-between md:order-1" id="navbar-sticky">
                    {/* Updated styles for desktop navigation list */}
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
                                    // toggleOpenClose(); // Removed toggleOpenClose as it's not relevant for desktop
                                }}
                                className='border border-secondary rounded-md text-neutral-50 px-3 py-2 hover:bg-secondary hover:text-primary' // Changed text-neutral-100 to text-neutral-50
                            >
                                Logout
                            </button>
                        }
                    </ul>
                </div>
            </div>

            {/* menu options (for mobile devices only) */}
            {/* Updated styles for mobile menu container and links */}
            <div className={`${isMobileMenuOpen ? "block" : "hidden"} items-center justify-between w-full md:hidden bg-primary`} id="navbar-sticky">
                <ul className="flex flex-col p-4 mt-4 font-medium">
                    {
                        links.map((link, idx) => <li
                            key={idx}
                            onClick={toggleOpenClose} // Keep toggle for closing menu on item click
                        >
                            {/* Re-uses PageLink component for consistent styling in mobile */}
                            <PageLink name={link.name} path={link.path} />
                        </li>)
                    }
                    {
                        isAuthenticated && <li onClick={toggleOpenClose}> {/* Added li wrapper and toggle for mobile logout */}
                            <button
                                onClick={() => {
                                    logoutUser(dispatch);
                                    // toggleOpenClose(); // Already handled by li
                                }}
                                className="block w-full text-left py-2 px-3 rounded text-neutral-50 hover:text-secondary font-sans" // Changed text-neutral-100 to text-neutral-50, added font-sans
                            >
                                Logout
                            </button>
                        </li>
                    }
                </ul>
            </div>
        </nav>

    )
};

export default Header;