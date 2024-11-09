import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useEffect } from "react";
import { get_user_info_with_token } from "../../features/auth/authActions";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        <div>
            <div className="min-h-[100vh] px-5 md:px-7 lg:px-12 py-2 md:py-3 space-y-12 flex flex-col justify-between items-center">
                <Header />
                <div className="w-full grow">
                    <Outlet />
                </div>
                <Footer />
            </div>

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