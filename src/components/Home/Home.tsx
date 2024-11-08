import { useNavigate } from "react-router-dom";
import AddVocab from "../AddVocab/AddVocab";
import CheckVocab from "../CheckVocab/CheckVocab";
import TakeTestConfigForm from "../TakeTest/TakeTestConfigForm";
import Loader from "../Loader/Loader";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

const Home = () => {
    const nav = useNavigate();

    // states
    const isLoading = useSelector((state: RootState) => state.vocab.loading);

    return (
        <div className="grid md:grid-cols-2 gap-3 md:gap-5 lg:gap-7 row-auto">
            <AddVocab />
            <div>
                <CheckVocab />
            </div>
            <div className="md:col-span-2 flex justify-center items-center">
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