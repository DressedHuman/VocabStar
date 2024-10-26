import { Outlet } from "react-router-dom";

const Root = () => {
    return (
        <div className="px-2 md:px-4 lg:px-12 py-2 md:py-3 lg:py-5">
            <h2 className="text-center text-3xl"><span className="text">VocapStar</span> | Learn to Never Forget</h2>
            <Outlet />
        </div>
    );
};

export default Root;