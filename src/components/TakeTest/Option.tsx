import { OptionType } from "./TakeTest";

interface Props {
    optionValue: string;
    index: number;
    checked: boolean;
    correct_answer?: OptionType | null;
    showResult?: boolean;
    checkHandler: (option: OptionType) => void;
};

const Option = ({ optionValue, index, checked, correct_answer, showResult = false, checkHandler }: Props) => {
    const clickHandler = () => {
        if (!showResult) {
            checkHandler(optionValue);
        }
    }

    const onKeyDownHandler = (e: React.KeyboardEvent<HTMLSpanElement>) => {
        if((e.key === "Enter" || e.key === " ") && !showResult) {
            e.preventDefault();
            clickHandler();
        }
    }

    return (
        <div className="text-start">
            <p>
                <span className="text-[gray]">({index === 0 ? "ক" : index === 1 ? "খ" : index === 2 ? "গ" : "ঘ"})</span> <span
                    onClick={clickHandler}
                    onKeyDown={onKeyDownHandler}
                    tabIndex={showResult ? -1 : 0}
                    className={`w-min text-wrap text-white font-hind_siliguri px-1 ${showResult ? "" : "cursor-pointer"} ${correct_answer === optionValue ? "bg-[green] font-semibold" : showResult ? checked ? "bg-[red]" : "" : (checked && "bg-[black]")}`}
                >
                    {optionValue}
                </span>
            </p>
        </div>
    );
};

export default Option;