import CardTitle from "../CardComponents/CardTitle";
import Button from "../FormComponents/Button";
import { ResultStateType } from "./TakeTest";

interface Props {
    openModal: boolean;
    setOpenModal: (state: boolean) => void;
    resultState: ResultStateType;
}

const ResultModal = ({ openModal, setOpenModal, resultState }: Props) => {
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

                                <div className="flex flex-wrap justify-center items-center gap-3 md:gap-5 font-semibold font-hind_siliguri">
                                    <div className="flex flex-col justify-center items-center gap-1 text-[green]">
                                        <p className="text-lg order-2 font-mono text-center">Right Answer(s)</p>
                                        <span className="text-2xl">{resultState.correct_answers}</span>
                                    </div>
                                    <div className="flex flex-col justify-center items-center gap-1 text-[#ff3543]">
                                        <p className="text-lg order-2 font-mono text-center">Wrong Answer(s)</p>
                                        <span className="text-2xl">{resultState.wrong_answers}</span>
                                    </div>
                                    <div className="flex flex-col justify-center items-center gap-1 text-[#222333]">
                                        <p className="text-lg order-2 font-mono text-center">Not Attempted</p>
                                        <span className="text-2xl">{resultState.not_attempted}</span>
                                    </div>
                                </div>

                                {/* review answers button */}
                                <Button label="Review Answers" onClickHandler={() => setOpenModal(false)} additional_classes="text-bg_color" />
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