interface Props {
    word: string | null;
    meaning: string | null;
};

const WordMeaning = ({word, meaning}: Props) => {
    return (
        <div className="flex flex-col justify-center items-center">
            <p className="text-base text-app_name">Meaning of <span className="text-lg font-semibold text-black">{word}</span></p>
            <p className="text-2xl text-[yellow] font-hind_siliguri">{meaning}</p>
        </div>
    );
};

export default WordMeaning;