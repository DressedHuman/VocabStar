import { useNavigate } from "react-router-dom";
import CardTitle from "../CardComponents/CardTitle";
import Button from "../FormComponents/Button";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const ErrorPage = () => {
    const nav = useNavigate();

    return (
        <div className="min-w-[100vw] min-h-[100vh] px-5 md:px-7 lg:px-12 py-2 md:py-3 space-y-12 flex flex-col justify-between items-center">
            <Header />
            <div className="flex flex-col justify-center items-center gap-4 grow">
                <CardTitle title="404 Not Found" />
                <Button label="Go Home" onClickHandler={() => nav("/")} />
            </div>
            <Footer additional_classes="z-[10]" />
        </div>
    );
};

export default ErrorPage;