import { ToFromLangs } from "./TakeTestConfigForm";

export interface LangType {
    id: "e" | "b";
    name: string;
}

interface Props {
    fromLang: LangType;
    toLang: LangType;
    color?: string;
    size?: "text-2xl lg:text-3xl" | "text-xl lg:text-2xl" | "text-lg lg:text-xl" | "text-base lg:text-lg" | "text-sm lg:text-base";
    swapper: (toFromLangs: ToFromLangs) => void;
};

const ConfigFormHeader = ({ fromLang, toLang, color = "text-card_title", size = "text-xl lg:text-2xl", swapper }: Props) => {
    const swapHandler = () => {
        const newLangsState = {
            from: toLang,
            to: fromLang,
        };
        swapper(newLangsState);
    }

    const onkeyDownHandler = (e: React.KeyboardEvent<HTMLSpanElement>) => {
        if(e.key==="Enter" || e.key===" ") {
            e.preventDefault();
            swapHandler();
        }
    }

    return (
        <div
            className="flex flex-nowrap justify-center items-center gap-3"
        >
            {/* from language */}
            <h2 className={`${size} font-semibold ${color} text-center`}>{fromLang.name}</h2>
            <span
                className={`${size} font-semibold text-[green] text-center cursor-pointer`}
                tabIndex={0}
                onKeyDown={onkeyDownHandler}
                onClick={swapHandler}
            >⇄</span>
            <h2 className={`${size} font-semibold ${color} text-center`}>{toLang.name}</h2>
        </div>
    );
};

export default ConfigFormHeader;