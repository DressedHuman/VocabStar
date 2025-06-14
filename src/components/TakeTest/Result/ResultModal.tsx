import { useEffect } from "react";
import CardTitle from "../../CardComponents/CardTitle";
import Button from "../../FormComponents/Button";
import { ResultStateType } from "../TakeTest";
import ResultItem from "./ResultItem";
// import Timer from "./Timer";

interface Props {
    openModal: boolean;
    setOpenModal: (state: boolean) => void;
    resultState: ResultStateType;
    takeAnotherTestHandler: () => void; // Added prop from TakeTest.tsx
}

const ResultModal = ({ openModal, setOpenModal, resultState, takeAnotherTestHandler }: Props) => {
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

    // Time formatting utility
    const formatTime = (totalSeconds: number) => {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}m ${seconds}s`;
    };

    if (!openModal) return null; // Render nothing if modal is not open

    return (
        // Modal Overlay
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 transition-opacity duration-150"
            onClick={() => setOpenModal(false)} // Close on overlay click
        >
            {/* Modal Content */}
            <div
                onClick={(e) => e.stopPropagation()}
                className={`bg-white w-full max-w-lg rounded-lg shadow-xl p-6 transform transition-all duration-300 ${openModal ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 -translate-y-10'}`}
            >
                <div className="max-h-[85vh] overflow-y-auto">
                    <CardTitle title="Test Result" additional_classes="text-center mb-6" />

                    <div className="text-center mb-6">
                        <p className="font-sans text-neutral-400 text-lg">Total Score</p>
                        <p className="font-heading text-primary text-4xl my-1">
                            {resultState.gained_marks} <span className="text-neutral-300 text-2xl">/ {resultState.total_marks}</span>
                        </p>
                        <p className="font-sans text-neutral-400 text-sm">
                            Time Taken: {formatTime(resultState.time_taken)}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 text-center">
                        <ResultItem label="Correct" count={resultState.correct_answers} type="right" />
                        <ResultItem label="Wrong" count={resultState.wrong_answers} type="wrong" />
                        <ResultItem label="Not Attempted" count={resultState.not_attempted} type="not_attempted" />
                    </div>

                    <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-neutral-200">
                        <Button label="Review Answers" variant="secondary" onClickHandler={() => setOpenModal(false)} />
                        <Button label="Take Another Test" variant="primary" onClickHandler={takeAnotherTestHandler} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResultModal;