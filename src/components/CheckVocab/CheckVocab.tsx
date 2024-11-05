import { useEffect, useState } from "react";
import CardStructure from "../CardComponents/CardStructure";
import CardTitle from "../CardComponents/CardTitle";
import Button from "../FormComponents/Button";
import InputField from "../FormComponents/InputField";
import WordMeaning from "./WordMeaning";
import { useDispatch, useSelector } from "react-redux";
import { checkVocab } from "../../features/vocab/vocabActions";
import { RootState } from "../../app/store";


interface CheckMeaningType {
    id: number;
    meaning: string;
};

export interface CheckWordMeaningType {
    word: string | null;
    meanings: CheckMeaningType[];
};

const CheckVocab = () => {
    const dispatch = useDispatch();
    // states
    const vocab_type = useSelector((state: RootState) => state.vocab.vocab_action);
    const [wordMeaning, setWordMeaning] = useState<CheckWordMeaningType>({ word: "", meanings: [] });
    const checkVocabError = useSelector((state: RootState) => state.vocab.error);

    const checkVocabHandler = (e: React.FormEvent) => {
        e.preventDefault();
        const form = new FormData(e.target as HTMLFormElement);

        checkVocab(form.get("check_word") as string, setWordMeaning, dispatch);
    }

    useEffect(() => {
        if(vocab_type==="check"){
            const check_word = document.querySelector("#check_word") as HTMLInputElement;
            check_word.focus();
        }
    }, [])


    return (
        <CardStructure>
            <CardTitle title="Check Meaning" />
            <form
                onSubmit={checkVocabHandler}
                className="flex flex-col lg:flex-row justify-center items-center lg:items-end gap-5"
            >
                <InputField id="check_word" name="check_word" label="Word" placeholder="type word" lang="en" required />
                <Button label="check" />
            </form>
            
            {/* word meanings */}
            {
                wordMeaning.word && wordMeaning.meanings.map((meaning) => <WordMeaning key={meaning.id} word={wordMeaning.word} meaning={meaning.meaning} />)
            }

            {/* error message */}
            {
                checkVocabError && <p className="text-center text-[yellow] font-open-sans">You might not know this word!</p>
            }
        </CardStructure>
    );
};

export default CheckVocab;