import { HTMLInputTypeAttribute } from "react";

interface Props {
    type?: HTMLInputTypeAttribute;
    label: string;
    name: string;
    id?: string;
    placeholder?: string;
    lang?: "en" | "bn";
    required?: boolean;
    focus?: boolean;
    rowCol?: "row" | "col";
    gapBetweenLabelField?: string;
    onChangeHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputField = ({ type = "text", label, name, id, placeholder, lang = "en", required = false, focus = false, rowCol="col", gapBetweenLabelField="gap-1", onChangeHandler }: Props) => {

    return (
        <div className={`w-min flex ${rowCol==="row" ? "flex-col md:flex-row" : "flex-col"} justify-center items-center ${gapBetweenLabelField}`}>
            <h3 className="text-lg text-font_color font-medium text-nowrap">{label}</h3>
            {
                rowCol==="row" && <p className="hidden md:block text-lg text-app_name font-bold">:</p>
            }
            <input
                className={`w-[275px] border-2 border-[#B1D4E0] focus:border-[#2E8BC0] outline-none px-2 py-1 rounded-md ${lang === "en" ? "font-open-sans placeholder:font-open-sans" : lang === "bn" ? "font-hind_siliguri placeholder:font-hind_siliguri" : ""}`}
                type={type}
                name={name}
                id={id}
                placeholder={placeholder}
                required={required}
                autoFocus={focus}
                onChange={onChangeHandler}
            />
        </div>
    );
};

export default InputField;