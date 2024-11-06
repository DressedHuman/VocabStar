import AddVocab from "../AddVocab/AddVocab";
import CheckVocab from "../CheckVocab/CheckVocab";
import TakeTestInfoForm from "../TakeTest/TakeTestInfoForm";

const Home = () => {
    return (
        <div className="grid md:grid-cols-2 gap-3 md:gap-5 lg:gap-7 row-auto">
            <AddVocab />
            <div>
                <CheckVocab />
            </div>
            <div className="md:col-span-2 flex justify-center items-center">
                <TakeTestInfoForm />
            </div>
        </div>
    );
};

export default Home;