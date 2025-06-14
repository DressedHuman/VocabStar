import { UserVocabType } from "./MyVocabsHome";
import ShowWord from "./ShowWord";

interface Props {
    userVocabs: UserVocabType[];
    deleteVocabHandler: (id: number) => void;
};

const MyVocabs = ({ userVocabs, deleteVocabHandler }: Props) => {
    return (
        <div className="flex flex-col items-stretch gap-4"> {/* items-stretch to make ShowWord take full width, consistent gap */}
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