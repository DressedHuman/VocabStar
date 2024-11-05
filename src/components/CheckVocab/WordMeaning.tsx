import { CheckMeaningType } from "./CheckVocab";

interface Props {
    word: string | null;
    meanings: CheckMeaningType[];
};

const WordMeaning = ({word, meanings}: Props) => {
    return (
        <div className="flex flex-col justify-center items-center">
            <p className="text-base text-app_name">{meanings.length>1 ? "Meanings": "Meaning"} of <span className="text-lg font-semibold text-black">{word}</span></p>
            <p className="text-2xl text-[yellow] font-hind_siliguri">
                {
                    meanings.map((meaning, index) => <span key={meaning.id}>{meaning.meaning}{index < meanings.length-1 && ", "}</span>)
                }
            </p>
        </div>
    );
};

export default WordMeaning;