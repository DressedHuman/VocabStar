import { useState } from "react";
import CardStructure from "../CardComponents/CardStructure";
import CardTitle from "../CardComponents/CardTitle";
import Button from "../FormComponents/Button";
import InputField from "../FormComponents/InputField";
import WordMeaning from "./WordMeaning";

interface WordMeaningType {
    word: string | null;
    meaning: string | null;
};

const CheckVocab = () => {
    const [wordMeaning, setWordMeaning] = useState<WordMeaningType>({ word: "", meaning: "" });

    const checkVocabHandler = (e: React.FormEvent) => {
        e.preventDefault();
        const data = new FormData(e.target as HTMLFormElement);

        // set the fetched vocab into state
        setWordMeaning({
            word: data.get("check_word") as string,
            meaning: data.get("check_word") as string
        });
    }


    return (
        <CardStructure>
            <CardTitle title="Check Meaning" />
            <form
                onSubmit={checkVocabHandler}
                className="flex flex-col lg:flex-row justify-center items-center lg:items-end gap-5"
            >
                <InputField id="check_word" name="check_word" label="Word" placeholder="type word" lang="en" />
                <Button label="check" />
            </form>

            {
                wordMeaning.word && <WordMeaning word={wordMeaning.word} meaning={wordMeaning.meaning} />
            }
        </CardStructure>
    );
};

export default CheckVocab;