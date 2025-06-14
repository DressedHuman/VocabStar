import { ToFromLangs } from "./TakeTestConfigForm";

export interface LangType {
    id: "e" | "b";
    name: string;
}

interface Props {
    fromLang: LangType;
    toLang: LangType;
    swapper: (toFromLangs: ToFromLangs) => void;
    additional_classes?: string;
};

const ConfigFormHeader = ({ fromLang, toLang, swapper, additional_classes }: Props) => {
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

    // Default styles for the header, mb-6 for spacing similar to CardTitle
    const defaultBaseStyles = "flex flex-nowrap justify-center items-center gap-3 mb-6";
    const langTextStyles = "font-heading text-primary text-xl text-center";
    const swapIconStyles = "font-semibold text-secondary text-xl text-center cursor-pointer focus:outline-none focus:ring-1 focus:ring-secondary rounded";

    return (
        <div className={`${defaultBaseStyles} ${additional_classes || ""}`}>
            {/* from language */}
            <h2 className={langTextStyles}>{fromLang.name}</h2>
            <span
                className={swapIconStyles}
                tabIndex={0}
                onKeyDown={onkeyDownHandler}
                onClick={swapHandler}
                role="button" // Accessibility: role button
                aria-label={`Swap languages, current is ${fromLang.name} to ${toLang.name}`} // Accessibility: aria-label
            >⇄</span>
            <h2 className={langTextStyles}>{toLang.name}</h2>
        </div>
    );
};

export default ConfigFormHeader;