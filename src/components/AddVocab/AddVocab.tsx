import CardStructure from "../CardComponents/CardStructure";
import CardTitle from "../CardComponents/CardTitle";
import Button from "../FormComponents/Button";
import InputField from "../FormComponents/InputField";

interface WordMeaningType {
    word: string | null;
    meaning: string | null;
};

const AddVocab = () => {
    const onSubmitHandler = (e: React.FormEvent) => {
        e.preventDefault();
        const form = new FormData(e.target as HTMLFormElement);

        const data: WordMeaningType = {
            word: form.get("from_word") as string,
            meaning: form.get("meaning") as string,
        };

        console.log(data);
    }


    return (
        <CardStructure>
            {/* Card Title */}
            <CardTitle title="Add New Vocab" />

            {/* Add Vocab Form */}
            <form
                onSubmit={onSubmitHandler}
                className="flex flex-col justify-center items-center gap-5"
            >
                <div className="flex flex-col lg:flex-row justify-center items-center gap-2 md:gap-4">
                    {/* Original English Word Field */}
                    <InputField label="Word" name="from_word" id="from_word" placeholder="type english word" required />

                    {/* Meaning Field */}
                    <InputField label="Meaning" name="meaning" id="meaning" placeholder="বাংলায় অর্থ লিখুন" lang="bn" required />
                </div>
                <Button label="Save" />
            </form>
        </CardStructure>
    );
};

export default AddVocab;