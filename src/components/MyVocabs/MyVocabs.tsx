import { UserVocabType } from "./MyVocabsHome";
import ShowWord from "./ShowWord";

interface Props {
    userVocabs: UserVocabType[];
    deleteVocabHandler: (id: number) => void;
}

const MyVocabs: React.FC<Props> = ({ userVocabs, deleteVocabHandler }) => {
    return (
        <div className="flex flex-col items-stretch gap-4">
            {userVocabs.map((word) => (
                <ShowWord
                    key={word.id}
                    word={word}
                    deleteVocab={() => deleteVocabHandler(word.id)}
                />
            ))}
        </div>
    );
};

export default MyVocabs;