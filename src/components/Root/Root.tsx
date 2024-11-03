import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useEffect } from "react";
import { get_user_info_with_token } from "../../features/auth/authActions";

const Root = () => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const dispatch = useDispatch();

    useEffect(() => {
        // at first, check if user is not authenticated
        if (isAuthenticated) return;

        // check if there is a token in localStorage
        const token = localStorage.getItem("token");
        if (token) {
            console.log(token);
            get_user_info_with_token(token, dispatch);
        }
        else{
            localStorage.removeItem("token");
        }
    }, []);

    return (
        <div className="min-w-[100vw] min-h-[100vh] px-5 md:px-7 lg:px-12 py-2 md:py-3 space-y-12 flex flex-col justify-between items-center">
            <Header />
            <div className="w-full grow">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Root;