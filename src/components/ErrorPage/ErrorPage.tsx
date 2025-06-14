import { useNavigate } from "react-router-dom";
import CardTitle from "../CardComponents/CardTitle";
import Button from "../FormComponents/Button";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import PageContainer from "../UI/PageContainer"; // Import PageContainer
import CenteredContent from "../UI/CenteredContent"; // Import CenteredContent

const ErrorPage = () => {
    const nav = useNavigate();

    return (
        <PageContainer useNeutralBackground additional_classes="flex flex-col items-stretch">
            <Header />
            {/* Used CenteredContent for the main error message area */}
            <CenteredContent additional_classes="flex flex-col justify-center items-center gap-6 grow py-12" textAlign="text-center">
                <h1 className="font-heading text-6xl md:text-8xl text-primary">404</h1>
                <CardTitle title="Page Not Found" additional_classes="text-2xl md:text-3xl" />
                <p className="font-sans text-neutral-400 text-base md:text-lg max-w-md">
                    Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or maybe you just mistyped the URL.
                </p>
                <Button label="Go to Homepage" variant="primary" onClickHandler={() => nav("/")} additional_classes="mt-4" />
            </CenteredContent>
            <Footer />
        </PageContainer> // Correctly close PageContainer, CenteredContent is self-contained now
    );
};

export default ErrorPage;