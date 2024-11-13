import { UserWordType } from "./MyVocabsHome";
import ShowWord from "./ShowWord";

interface Props {
    userWords: UserWordType[];
};

const MyVocabs = ({ userWords }: Props) => {
    return (
        <div>
            <div className="flex flex-col justify-center items-center gap-3 lg:gap-5 text-[gold]">
                {
                    userWords.map(word => <ShowWord
                        key={word.id}
                        word={word}
                    />)
                }
            </div>
        </div>
    );
};

export default MyVocabs;