import { UserVocabType } from "./MyVocabsHome";
import ShowWord from "./ShowWord";

interface Props {
    userVocabs: UserVocabType[];
    deleteVocabHandler: (id: number) => void;
};

const MyVocabs = ({ userVocabs, deleteVocabHandler }: Props) => {
    return (
        <div>
            <div className="flex flex-col justify-center items-center gap-3 lg:gap-5 text-[gold]">
                {
                    userVocabs.map(word => <ShowWord
                        key={word.id}
                        word={word}
                        deleteVocab={() => deleteVocabHandler(word.id)}
                    />)
                }
            </div>
        </div>
    );
};

export default MyVocabs;