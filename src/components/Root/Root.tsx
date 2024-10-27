import { Outlet } from "react-router-dom";

const Root = () => {
    return (
        <div className="min-w-[100vw] min-h-[100vh] px-2 md:px-4 lg:px-12 py-2 md:py-3 space-y-5">
            <h2 className="text-center text-2xl md:text-3xl lg:text-4xl font-semibold text-[#0C2D48] font-ubuntu">VocabStar</h2>
            <Outlet />
        </div>
    );
};

export default Root;