import { useEffect, useState } from "react";
import CardStructure from "../CardComponents/CardStructure";
import CardTitle from "../CardComponents/CardTitle";
import Button from "../FormComponents/Button";
import InputField from "../FormComponents/InputField";
import WordMeaning from "./WordMeaning";
import { useDispatch, useSelector } from "react-redux";
import { checkVocab } from "../../features/vocab/vocabActions";
import { RootState } from "../../app/store";


export interface CheckMeaningType {
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
        if (vocab_type === "check") {
            const check_word = document.querySelector("#check_word") as HTMLInputElement;
            if (check_word) { // Ensure element exists
                check_word.focus();
            }
        }
    }, [vocab_type]) // Added vocab_type to dependency array


    return (
        <CardStructure additional_classes="max-w-2xl mx-auto"> {/* Centered card with max-width */}
            <CardTitle title="Check Word Meaning" /> {/* Updated title */}
            <form
                onSubmit={checkVocabHandler}
                className="flex flex-col sm:flex-row sm:items-end sm:gap-4 gap-3" // Responsive layout for form
            >
                <InputField
                    id="check_word"
                    name="check_word"
                    label="Word"
                    placeholder="Enter a word" // Updated placeholder
                    required
                    autoFocus // Added autoFocus based on useEffect logic
                    additional_classes="w-full sm:flex-grow" // Input field takes more space
                />
                <Button label="Check Word" variant="primary" type="submit" additional_classes="w-full sm:w-auto"/> {/* Added type and variant */}
            </form>

            {/* word meanings */}
            {
                wordMeaning.word && wordMeaning.meanings.length > 0 && (
                    <div className="mt-6"> {/* Added margin top for spacing */}
                        <WordMeaning word={wordMeaning.word} meanings={wordMeaning.meanings} />
                    </div>
                )
            }

            {/* error message */}
            {/* Ensure checkVocabError is specific to this component's action if it's a shared slice state */}
            {
                checkVocabError && vocab_type === "check" && (
                    <div className="mt-4 text-center"> {/* Added margin top and text-center */}
                        <h3 className="font-heading text-primary text-lg">{wordMeaning.word || "Word not found"}</h3>
                        <p className="font-sans text-error text-base">Could not find the meaning for this word.</p> {/* Clearer error message */}
                    </div>
                )
            }
        </CardStructure>
    );
};

export default CheckVocab;