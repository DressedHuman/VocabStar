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
};

const MCQSingle = ({ data, index, total, showResult, setSelectedOptions }: Props) => {
    const [selectedOption, setSelectedOption] = useState<OptionType>();

    // check handler
    const checkHandler = (option: OptionType) => {
        setSelectedOption(option);
        setSelectedOptions((selectedOptions) => {
            selectedOptions[index] = option;
            return selectedOptions;
        })
    }

    return (
        <CardStructure additional_classes={showResult ? (selectedOption?.id===data.correct_answer.id ? "border-4 !border-[green]" : (selectedOption ? "border-4 !border-[red]" : "")) : ""}>
            <CardTitle title={`${index+1}/${total}: ${data.question}`} size="text-base lg:text-lg" />

            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-7 lg:grid-cols-5">
                <span className="hidden md:block"></span>
                <div className="md:col-span-5 lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-5">
                    {
                        data.options.map((option, idx) => <Option
                            key={idx}
                            optionValue={option}
                            index={idx}
                            correct_answer={showResult ? data.correct_answer : null}
                            checked={selectedOption === option}
                            checkHandler={checkHandler}
                            showResult={showResult}
                        />)
                    }
                </div>
                <span className="hidden md:block"></span>
            </div>
        </CardStructure>
    );
};

export default MCQSingle;