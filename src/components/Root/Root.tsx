import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useEffect } from "react";
import { get_user_info_with_token } from "../../features/auth/authActions";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageContainer from "../UI/PageContainer"; // Import PageContainer

const Root = () => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const dispatch = useDispatch();

    useEffect(() => {
        // at first, check if user is not authenticated
        if (isAuthenticated) return;

        // check if there is a token in localStorage
        const token = localStorage.getItem("token");
        if (token) {
            get_user_info_with_token(token, dispatch);
        }
        else {
            localStorage.removeItem("token");
        }
    }, []);

    return (
        // Using PageContainer for consistent page structure and background
        // additional_classes ensure flex layout for header, outlet, footer
        <PageContainer useNeutralBackground additional_classes="flex flex-col items-stretch min-h-screen">
            <Header />
            {/* grow class makes the Outlet container take available vertical space */}
            <main className="w-full grow flex flex-col"> {/* Added flex flex-col to allow Outlet content to also grow if needed */}
                <Outlet />
            </main>
            <Footer />

            {/* react toasts container */}
            <ToastContainer
                position="top-right"
                autoClose={3500}
                newestOnTop={false}
                transition={Slide}
                pauseOnFocusLoss={false}
                pauseOnHover
            />
        </div>
    );
};

export default Root;