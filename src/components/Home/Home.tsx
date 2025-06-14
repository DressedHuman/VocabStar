import { useNavigate } from "react-router-dom";
import AddVocab from "../AddVocab/AddVocab";
import CheckVocab from "../CheckVocab/CheckVocab";
import TakeTestConfigForm from "../TakeTest/Config/TakeTestConfigForm";
import Loader from "../Loader/Loader";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import PageContainer from "../UI/PageContainer"; // Import PageContainer

const Home = () => {
    const nav = useNavigate();

    // states
    const isLoading = useSelector((state: RootState) => state.vocab.loading);

    // The AddVocab, CheckVocab, and TakeTestConfigForm components have been
    // internally updated to use CardStructure, so they will appear as cards.
    // This Home component will now arrange them in a single column with spacing.
    return (
        <PageContainer useNeutralBackground additional_classes="space-y-8">
            {isLoading && <Loader />}

            <h1 className="font-heading text-3xl md:text-4xl text-primary text-center pt-4 md:pt-0 mb-6 md:mb-10">
                {/* Added some top padding for the heading, removed from PageContainer default for more control */}
                Welcome to VocabStar
            </h1>

            {/* AddVocab section */}
            {/* AddVocab already uses CardStructure. We might want to control its max-width or centering if needed. */}
            {/* For now, assuming AddVocab's CardStructure will have mx-auto or similar if it's narrower than page. */}
            <section aria-labelledby="add-vocab-heading">
                 {/* h2 for screen readers, CardTitle inside AddVocab provides visual title */}
                <h2 id="add-vocab-heading" className="sr-only">Add New Vocabulary</h2>
                <AddVocab />
            </section>

            {/* CheckVocab section */}
            <section aria-labelledby="check-vocab-heading">
                <h2 id="check-vocab-heading" className="sr-only">Check Vocabulary Meaning</h2>
                <CheckVocab />
            </section>

            {/* TakeTestConfigForm section */}
            <section aria-labelledby="take-test-heading">
                <h2 id="take-test-heading" className="sr-only">Configure and Start a Test</h2>
                {/* TakeTestConfigForm is already wrapped in CardStructure and centered with max-w-lg */}
                <TakeTestConfigForm configHandler={(config) => nav("/take_test", { state: config })} autoFocus={false} />
                {/* Set autoFocus to false as it's not the primary action on this page */}
            </section>
        </PageContainer>
    );
};

export default Home;