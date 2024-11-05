import { useDispatch, useSelector } from "react-redux";
import CardStructure from "../CardComponents/CardStructure";
import CardTitle from "../CardComponents/CardTitle";
import Button from "../FormComponents/Button";
import InputField from "../FormComponents/InputField";
import { RootState } from "../../app/store";
import FormError from "../FormComponents/FormError";
import { addVocab } from "../../features/vocab/vocabActions";
import { useEffect } from "react";

interface MeaningType {
    "meaning": string;
};


export interface WordMeaningType {
    word: string | null;
    meanings: MeaningType[];
};

const AddVocab = () => {
    const dispatch = useDispatch();
    // states
    const vocab_type = useSelector((state: RootState) => state.vocab.vocab_action);
    const addVocabSuccess = useSelector((state: RootState) => state.vocab.successfull);
    const addVocabError = useSelector((state: RootState) => state.vocab.error);

    // add vocab handler
    const addVocabHandler = (e: React.FormEvent) => {
        e.preventDefault();
        const form = new FormData(e.target as HTMLFormElement);
        const word = form.get("from_word") as string;
        const word_meanings = form.getAll("meaning[]") as string[];

        const word_meaning: WordMeaningType = {
            word: word.toLowerCase(),
            meanings: word_meanings.map((meaning) => {
                return { "meaning": meaning };
            }),
        };
        addVocab(word_meaning, dispatch);
    }

    useEffect(() => {
        if (vocab_type==="add" && addVocabSuccess) {
            // resetting the form
            const form = document.querySelector("#add_vocab_form") as HTMLFormElement;
            form.reset();
            const wordElem = form.querySelector("#from_word") as HTMLInputElement;
            wordElem.focus();
        }
    })

    return (
        <CardStructure>
            {/* Card Title */}
            <CardTitle title="Add New Vocab" />

            {/* Add Vocab Form */}
            <form
                id="add_vocab_form"
                onSubmit={addVocabHandler}
                className="flex flex-col justify-center items-center gap-5"
            >
                <div className="flex flex-col lg:flex-row justify-center items-center gap-2 md:gap-4">
                    {/* Original English Word Field */}
                    <InputField label="Word" name="from_word" id="from_word" placeholder="type english word" required focus />

                    {/* Meaning Field */}
                    <InputField label="Meaning" name="meaning[]" placeholder="বাংলায় অর্থ লিখুন" lang="bn" required />
                </div>

                {/* Submission Error */}
                {(vocab_type==="add" && addVocabError) && <FormError errorText={addVocabError} />}

                {/* Submit Button */}
                <Button label="Save" button_type="submit" />
            </form>
        </CardStructure>
    );
};

export default AddVocab;