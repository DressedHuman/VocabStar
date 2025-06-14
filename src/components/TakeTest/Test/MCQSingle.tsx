import { useState } from "react";
import CardStructure from "../../CardComponents/CardStructure";
import CardTitle from "../../CardComponents/CardTitle";
import Option from "./Option";
import { MCQType, OptionType, SelectedOptionType } from "../TakeTest";

interface Props {
    data: MCQType;
    index: number;
    total: number;
    showResult: boolean;
    setSelectedOptions: (updater: (selOptions: SelectedOptionType[]) => SelectedOptionType[]) => void;
    disabled?: boolean; // Added disabled prop from TakeTest.tsx
};

const MCQSingle = ({ data, index, total, showResult, setSelectedOptions, disabled }: Props) => {
    const [selectedOption, setSelectedOption] = useState<OptionType | undefined>(undefined); // Ensure type consistency

    // check handler
    const checkHandler = (option: OptionType) => {
        setSelectedOption(option);
        setSelectedOptions((selectedOptions) => {
            selectedOptions[index] = option;
            return selectedOptions;
        })
    }

    let borderClass = "";
    if (showResult) {
        if (selectedOption) {
            if (selectedOption.id === data.correct_answer.id) {
                borderClass = "border-2 border-success"; // Green border for correct
            } else {
                borderClass = "border-2 border-error"; // Red border for incorrect
            }
        } else {
            // Optionally, a different border for not attempted but shown result
            borderClass = "border-2 border-neutral-300"; // Grey for not attempted
        }
    }

    return (
        <CardStructure additional_classes={`transition-all duration-300 ${borderClass}`}>
            <CardTitle
                title={`${index + 1}. ${data.question}`} // Standard numbering, removed total for cleaner look per question
                additional_classes="text-xl text-left mb-4" // Adjusted size and alignment
            />

            {/* Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-4">
                {data.options.map((option, optIdx) => (
                    <Option
                        key={optIdx} // Use option.id if available and unique, otherwise optIdx
                        optionValue={option}
                        index={optIdx} // This index is for A, B, C, D labeling
                        correct_answer={showResult ? data.correct_answer : null}
                        checked={selectedOption?.id === option.id}
                        checkHandler={disabled ? () => {} : checkHandler} // Disable handler if test ended
                        showResult={showResult}
                        disabled={disabled} // Pass disabled state to Option
                    />
                ))}
            </div>
        </CardStructure>
    );
};

export default MCQSingle;