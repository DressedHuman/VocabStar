import { HTMLInputTypeAttribute } from "react";

interface Props {
    type?: HTMLInputTypeAttribute;
    label: string;
    name: string;
    id: string;
    placeholder: string;
    lang?: "en" | "bn";
    required?: boolean;
};

const InputField = ({ type = "text", label, name, id, placeholder, lang = "en", required = false }: Props) => {

    return (
        <div className="w-min flex flex-col justify-center items-center gap-1">
            <h3 className="text-lg text-font_color font-medium">{label}</h3>
            <input className={`w-[275px] border-2 border-[#B1D4E0] focus:border-[#2E8BC0] outline-none px-2 py-1 rounded-md ${lang === "en" ? "placeholder:font-open-sans" : lang === "bn" ? "placeholder:font-hind_siliguri" : ""}`} type={type} name={name} id={id} placeholder={placeholder} required={required} />
        </div>
    );
};

export default InputField;