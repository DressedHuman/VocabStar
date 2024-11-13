import { UserWordType } from "./MyVocabsHome";

interface Props {
    word: UserWordType;
};

const ShowWord = ({ word }: Props) => {
    return (
        <div className="w-full grid grid-cols-3 gap-3 items-center text-lg lg:text-xl border-2 border-border_color rounded-md px-4 py-2 divide-x-[1px] divide-border_color capitalize">
            <h2 className="text-center">{word.word}</h2>

            {/* Meanings */}
            <div className="col-span-2 text-center divide-y-[1px] divide-border_color">
                {
                    word.meanings.map(meaning => <p
                        key={meaning.id}
                        className="font-hind_siliguri"
                    >
                        {meaning.meaning}
                    </p>)
                }
            </div>
        </div>
    );
};

export default ShowWord;