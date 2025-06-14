import { HTMLInputTypeAttribute } from "react";

interface Props {
    type?: HTMLInputTypeAttribute;
    label: string;
    name: string;
    id?: string;
    placeholder?: string;
    required?: boolean;
    autoFocus?: boolean; // Renamed from focus to autoFocus for clarity
    layout?: "col" | "row"; // Simplified layout prop
    onChangeHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string | number;
    disabled?: boolean;
};

const InputField = ({
    type = "text",
    label,
    name,
    id,
    placeholder,
    required = false,
    autoFocus = false,
    layout = "col",
    onChangeHandler,
    value,
    disabled = false
}: Props) => {
    const inputId = id || name;

    return (
        <div className={`w-full flex ${layout === "row" ? "md:flex-row md:items-center md:gap-2" : "flex-col gap-1"}`}>
            <label
                htmlFor={inputId}
                className="font-sans text-sm font-medium text-primary"
            >
                {label}
                {required && <span className="text-error ml-1">*</span>}
            </label>
            <input
                type={type}
                name={name}
                id={inputId}
                placeholder={placeholder}
                required={required}
                autoFocus={autoFocus}
                onChange={onChangeHandler}
                value={value}
                disabled={disabled}
                className={`w-full font-sans border border-neutral-300 px-3 py-2 rounded-md
                            focus:border-primary focus:ring-1 focus:ring-primary outline-none
                            placeholder:text-neutral-500 transition-colors duration-150 ease-in-out
                            ${disabled ? "bg-neutral-100 cursor-not-allowed text-neutral-500" : "bg-white"}`}
            />
        </div>
    );
};

export default InputField;