import Button from "../FormComponents/Button";
import InputField from "../FormComponents/InputField";

const AddVocab = () => {
    const onSubmitHandler = (e: React.FormEvent) => {
        e.preventDefault();
    }
    return (
        <div>
            <h2 className="text-xl lg:text-2xl font-semibold text-[#145DA0] text-center">Add New Vocab</h2>
            <form
            onSubmit={onSubmitHandler}
            className="flex flex-col justify-center items-center gap-3"
            >
                <div className="flex flex-col lg:flex-row justify-center items-center gap-2 md:gap-4">
                    <InputField label="Word" name="to_word" id="to_word" />
                    <InputField label="Meaning" name="meaning" id="meaning" />
                </div>
                <Button label="Save" />
            </form>
        </div>
    );
};

export default AddVocab;