import { useNavigate } from "react-router-dom";
import CardTitle from "../CardComponents/CardTitle";
import Button from "../FormComponents/Button";
import Header from "../Header/Header";

const ErrorPage = () => {
    const nav = useNavigate();

    return (
        <div className="min-w-[100vw] min-h-[100vh] px-5 md:px-7 lg:px-12 py-2 md:py-3 space-y-12">
            <Header />
            <div className="fixed top-0 bottom-0 left-0 right-0 flex flex-col justify-center items-center gap-4">
                <CardTitle title="404 Not Found" />
                <Button label="Go Home" onClickHandler={() => nav("/")} />
            </div>
        </div>
    );
};

export default ErrorPage;