import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Root = () => {
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