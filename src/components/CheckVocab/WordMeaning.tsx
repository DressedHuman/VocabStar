import { CheckMeaningType } from "./CheckVocab";

interface Props {
    word: string | null;
    meanings: CheckMeaningType[];
};

const WordMeaning = ({word, meanings}: Props) => {
    return (
        <div className="flex flex-col items-center text-center py-4"> {/* Added text-center and padding */}
            <p className="font-sans text-base text-neutral-400">
                {meanings.length > 1 ? "Meanings" : "Meaning"} of <span className="font-semibold text-primary text-lg">{word}</span>
            </p>
            <div className="mt-2"> {/* Wrapper for meanings for better spacing if they wrap */}
                {meanings.map((meaning, index) => (
                    <span key={meaning.id} className="font-hind_siliguri text-secondary text-xl">
                        {meaning.meaning}
                        {index < meanings.length - 1 && <span className="text-neutral-400">, </span>}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default WordMeaning;