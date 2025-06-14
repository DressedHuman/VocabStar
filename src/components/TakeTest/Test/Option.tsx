import { OptionType } from "../TakeTest";

interface Props {
    optionValue: OptionType;
    index: number;
    checked: boolean;
    correct_answer?: OptionType | null;
    showResult?: boolean;
    checkHandler: (option: OptionType) => void;
    disabled?: boolean; // Added disabled prop
};

const Option = ({ optionValue, index, checked, correct_answer, showResult = false, checkHandler, disabled = false }: Props) => {
    const clickHandler = () => {
        if (!disabled && !showResult) { // Check disabled state here
            checkHandler(optionValue);
        }
    }

    const onKeyDownHandler = (e: React.KeyboardEvent<HTMLButtonElement>) => { // Changed to HTMLButtonElement
        if ((e.key === "Enter" || e.key === " ") && !disabled && !showResult) { // Check disabled state
            e.preventDefault();
            clickHandler();
        }
    }

    const optionPrefix = ["ক", "খ", "গ", "ঘ", "ঙ", "চ"]; // Extended for more options if needed

    let buttonClasses = "w-full text-left p-3 border rounded-md transition-colors duration-150 ease-in-out font-sans flex items-center text-base"; // Base classes

    if (disabled || showResult) {
        buttonClasses += " cursor-not-allowed";
        if (showResult) {
            if (correct_answer?.id === optionValue.id) {
                buttonClasses += " bg-success/20 border-success text-success-700 font-semibold"; // Correct answer
            } else if (checked && correct_answer?.id !== optionValue.id) {
                buttonClasses += " bg-error/20 border-error text-error-700 line-through"; // Incorrectly selected
            } else {
                buttonClasses += " bg-white border-neutral-200 text-neutral-400 opacity-70"; // Not selected, not correct
            }
        } else { // Disabled but not showing result (e.g. test ended before submitting this particular question)
             buttonClasses += " bg-neutral-100 opacity-60";
        }
    } else { // Active (not disabled, not showing result)
        buttonClasses += " cursor-pointer";
        if (checked) {
            buttonClasses += " bg-secondary border-secondary text-neutral-900"; // Changed text-neutral-50 to text-neutral-900
        } else {
            buttonClasses += " bg-white hover:bg-neutral-100 border-neutral-300 text-neutral-500";
        }
    }

    return (
        <button
            onClick={clickHandler}
            onKeyDown={onKeyDownHandler}
            tabIndex={(disabled || showResult) ? -1 : 0}
            className={buttonClasses}
            disabled={disabled || showResult} // HTML disabled attribute
            aria-pressed={checked} // Accessibility: aria-pressed
        >
            <span className="mr-2 font-semibold">({optionPrefix[index] || index + 1})</span>
            <span className="font-hind_siliguri flex-grow">{optionValue.value}</span>
            {showResult && correct_answer?.id === optionValue.id && <span className="ml-2 text-sm">(Correct)</span>}
            {showResult && checked && correct_answer?.id !== optionValue.id && <span className="ml-2 text-sm">(Your Answer)</span>}
        </button>
    );
};

export default Option;