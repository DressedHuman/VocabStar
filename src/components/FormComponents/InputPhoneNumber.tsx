import { parsePhoneNumber } from "libphonenumber-js";
import InputField from "./InputField";
import { useState } from "react";

interface Props {
    name: string;
    id?: string;
    label: string;
    placeholder: string;
    required?: boolean;
    autoFocus?: boolean; // Updated from focus
};

const InputPhoneNumber = ({ name, id, label, placeholder, required, autoFocus }: Props) => { // Updated prop name
    const [error, setError] = useState("");

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        // parse the phone number with Bangladeshi country code
        const parsedNumber = parsePhoneNumber(value, "BD");

        // validate the phone number
        if (parsedNumber && parsedNumber.isValid()) {
            setError("");
            e.target.value = parsedNumber.formatInternational();
        }
        else {
            setError("invalid phone number");
        }

    }

    return (
        <div className="w-full"> {/* Ensure it takes available width */}
            <InputField
                type="tel" // Changed to "tel" for semantic phone number input
                name={name}
                id={id}
                label={label}
                placeholder={placeholder}
                required={required}
                autoFocus={autoFocus} // Passed updated prop
                onChangeHandler={onChangeHandler}
            />
            {
                error && <p className="font-sans text-sm font-medium text-error text-center mt-1">{error}</p> // Styled error message
            }
        </div>
    );
};

export default InputPhoneNumber;