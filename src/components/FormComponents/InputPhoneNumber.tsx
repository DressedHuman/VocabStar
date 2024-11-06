import { parsePhoneNumber } from "libphonenumber-js";
import InputField from "./InputField";
import { useState } from "react";

interface Props {
    name: string;
    id?: string;
    label: string;
    placeholder: string;
    required?: boolean;
    focus?: boolean;
};

const InputPhoneNumber = ({ name, id, label, placeholder, required, focus }: Props) => {
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
        <div>
            <InputField type="text" name={name} id={id} label={label} placeholder={placeholder} required={required} focus={focus} onChangeHandler={onChangeHandler} />
            {
                error && <p className="font-mono text-center text-[yellow]">{error}</p>
            }
        </div>
    );
};

export default InputPhoneNumber;