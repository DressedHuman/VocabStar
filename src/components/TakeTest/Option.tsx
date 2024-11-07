import { OptionType } from "./TakeTest";

interface Props {
    optionValue: string;
    index: number;
    checked: boolean;
    correct_answer?: OptionType | null;
    showResult?: boolean;
    checkHandler: (option: OptionType) => void;
};

const Option = ({ optionValue, index, checked, correct_answer, showResult=false, checkHandler }: Props) => {
    return (
        <div className="text-start">
            <p
                onClick={() => {
                    if (!showResult) {
                        checkHandler(optionValue);
                    }
                }}>
                <span className="text-[gray]">({index === 0 ? "ক" : index === 1 ? "খ" : index === 2 ? "গ" : "ঘ"})</span> <span
                    className={`w-min text-wrap text-white font-hind_siliguri px-1 ${showResult ? "" : "cursor-pointer"} ${correct_answer===optionValue ? "bg-[green] font-semibold" : showResult ? checked ? "bg-[red]" : "" : (checked && "bg-[black]")}`}
                >
                    {optionValue}
                </span>
            </p>
        </div>
    );
};

export default Option;