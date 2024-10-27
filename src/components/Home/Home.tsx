import { useNavigate } from "react-router-dom";
import AddVocab from "../AddVocab/AddVocab";
import CheckVocab from "../CheckVocab/CheckVocab";
import Button from "../FormComponents/Button";
import CardStructure from "../CardComponents/CardStructure";

const Home = () => {
    const nav = useNavigate();
    return (
        <div className="grid md:grid-cols-2 gap-3 md:gap-5 lg:gap-7 row-auto">
            <AddVocab />
            <div>
                <CheckVocab />
            </div>
            <div className="md:col-span-2 flex justify-center items-center">
                <CardStructure additional_classes="flex justify-center items-center">
                    <Button label="Take Test" onClickHandler={() => { nav("/take_test") }} />
                </CardStructure>
            </div>
        </div>
    );
};

export default Home;