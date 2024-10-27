import CardStructure from "../CardComponents/CardStructure";
import CardTitle from "../CardComponents/CardTitle";
import Button from "../FormComponents/Button";
import InputField from "../FormComponents/InputField";

const AddVocab = () => {
    const onSubmitHandler = (e: React.FormEvent) => {
        e.preventDefault();
    }
    return (
        <CardStructure>
            <CardTitle title="Add New Vocab" />
            <form
            onSubmit={onSubmitHandler}
            className="flex flex-col justify-center items-center gap-5"
            >
                <div className="flex flex-col lg:flex-row justify-center items-center gap-2 md:gap-4">
                    <InputField label="Word" name="to_word" id="to_word" placeholder="type english word" lang="en" />
                    <InputField label="Meaning" name="meaning" id="meaning" placeholder="বাংলায় অর্থ লিখুন" lang="bn" />
                </div>
                <Button label="Save" />
            </form>
        </CardStructure>
    );
};

export default AddVocab;