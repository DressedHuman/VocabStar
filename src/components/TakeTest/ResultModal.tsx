import { useEffect } from "react";
import CardTitle from "../CardComponents/CardTitle";
import Button from "../FormComponents/Button";
import { ResultStateType } from "./TakeTest";
import ResultItem from "./ResultItem";
// import Timer from "./Timer";

interface Props {
    openModal: boolean;
    setOpenModal: (state: boolean) => void;
    resultState: ResultStateType;
}

const ResultModal = ({ openModal, setOpenModal, resultState }: Props) => {
    useEffect(() => {
        const body = document.body as HTMLBodyElement;
        if (openModal) {
            body.classList.add("overflow-hidden");
            body.setAttribute("area-hidden", "true");
        }
        else {
            body.classList.remove("overflow-hidden");
            body.removeAttribute("area-hidden");
        }
    });

    return (
        <>
            {/* instruction modal to add homework perfectly */}
            {/* modal source: https://navigateui.com/components/modal */}
            <div className="w-[100vw] mx-auto flex items-center justify-center font-open-sans">
                {/* clicking outside the modal message won't close the modal */}
                {/* div with full window overlay */}
                <div className={`fixed flex justify-center items-center z-[100] ${openModal ? 'visible opacity-1' : 'invisible opacity-0'} inset-0 w-full h-full backdrop-blur-sm bg-none duration-100`}>
                    {/* stopped propagation for event bubble for the main modal content */}
                    {/* main modal here */}
                    <div onClick={(e_) => e_.stopPropagation()} className={`absolute w-[87vw] md:w-[500px] lg:w-[750px] bg-[#aaaaff] drop-shadow-2xl rounded-lg ${openModal ? 'scale-100 opacity-1 duration-300 translate-y-0' : 'scale-0 -translate-y-20 opacity-0 duration-150'}`}>
                        <div className="p-5 md:p-7 relative">
                            {/* modal message here */}
                            <div className="max-h-[75vh] overflow-auto space-y-3 md:space-y-4 lg:space-y-5 flex flex-col justify-center items-center gap-5">
                                {/* score out of total marks */}
                                <CardTitle title={`Score: ${resultState.gained_marks}/${resultState.total_marks}`} size="text-2xl lg:text-3xl" color="text-bg_color" />
                                {/* <Timer totalSeconds={resultState.time_taken} /> */}

                                <div className="flex flex-wrap justify-center items-center gap-3 md:gap-5 font-semibold font-hind_siliguri">
                                    {/* right answers */}
                                    <ResultItem label="Correct Answer(s)" count={resultState.correct_answers} type="right" />
                                    {/* wrong answers */}
                                    <ResultItem label="Wrong Answer(s)" count={resultState.wrong_answers} type="wrong" />
                                    {/* not attempted */}
                                    <ResultItem label="Not Attempted" count={resultState.not_attempted} type="not_attempted" />
                                </div>

                                {/* review answers button */}
                                <Button label="Review Answers" onClickHandler={() => setOpenModal(false)} font_color="text-bg_color" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* instruction modal ended */}
        </>
    );
};

export default ResultModal;