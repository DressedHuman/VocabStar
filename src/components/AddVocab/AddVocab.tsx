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
        const word_meanings = form.get("meaning") as string;

        const word_meaning: WordMeaningType = {
            word: word.toLowerCase(),
            meanings: word_meanings.split(",").map((meaning) => {
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
                className="flex flex-col items-stretch gap-5" // Changed to items-stretch
            >
                <div className="flex flex-col lg:flex-row items-start gap-4"> {/* items-start for better alignment with labels, adjusted gap */}
                    {/* Original English Word Field */}
                    <InputField
                        label="Word"
                        name="from_word"
                        id="from_word"
                        placeholder="e.g., benevolent"
                        required
                        autoFocus // Changed from focus
                        additional_classes="w-full lg:w-1/2" // Take full width on small, half on large
                    />

                    {/* Meaning Field */}
                    <InputField
                        label="Meaning(s)"
                        name="meaning"
                        placeholder="Enter meanings, separated by commas" // Updated placeholder
                        required
                        additional_classes="w-full lg:w-1/2" // Take full width on small, half on large
                        // lang="bn" prop removed as InputField no longer uses it
                    />
                </div>

                {/* Submission Error */}
                {(vocab_type==="add" && addVocabError) && <FormError errorText={addVocabError} />}

                {/* Submit Button */}
                <Button label="Save Word" button_type="submit" variant="primary" additional_classes="w-full md:w-auto md:self-end" />
                {/* md:w-auto and md:self-end to make it not full width on larger screens and align to right */}
            </form>
        </CardStructure>
    );
};

export default AddVocab;