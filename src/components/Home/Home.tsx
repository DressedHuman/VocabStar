import { useNavigate } from "react-router-dom";
import AddVocab from "../AddVocab/AddVocab";
import CheckVocab from "../CheckVocab/CheckVocab";
import TakeTestConfigForm from "../TakeTest/Config/TakeTestConfigForm";
import Loader from "../Loader/Loader";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

const Home = () => {
    const nav = useNavigate();

    // states
    const isLoading = useSelector((state: RootState) => state.vocab.loading);

    return (
        <div className="flex flex-col items-center gap-6 md:gap-8 lg:gap-10">
            <div className="w-full max-w-xl">
                <AddVocab />
            </div>
            <div className="w-full max-w-xl">
                <CheckVocab />
            </div>
            <div className="w-full max-w-xl flex justify-center items-center">
                <TakeTestConfigForm configHandler={(config) => nav("/take_test", { state: config })} />
            </div>

            {/* loader component */}
            {
                isLoading && <Loader />
            }
        </div>
    );
};

export default Home;