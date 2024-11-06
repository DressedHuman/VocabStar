import { useNavigate } from "react-router-dom";
import CardStructure from "../CardComponents/CardStructure";
import CardTitle from "../CardComponents/CardTitle";
import Button from "../FormComponents/Button";
import InputField from "../FormComponents/InputField";

const TakeTestInfoForm = () => {
    const nav = useNavigate();

    // Word Count Value Change Handler
    const wordCountValueChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if(value<1) {
            e.target.value = "1";
        }
        else {
            e.target.value = `${value}`;
        }
    }

    // Duration Field Value Change Handler
    const durationValueChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if(value<1){
            e.target.value = "1";
        }
        else {
            e.target.value = `${value}`;
        }
    }

    // Form On Submit Handler
    const onSubmitHandler = (e: React.FormEvent) => {
        e.preventDefault();
        const form = new FormData(e.target as HTMLFormElement);

        const take_test_config = {
            "word_count": parseInt(form.get("word_count") as string),
            "duration": parseInt(form.get("duration") as string),
        };
        nav("/take_test", {
            state: take_test_config,
        })
    }

    return (
        <CardStructure>
            {/* Card Title */}
            <CardTitle title="English to Bengali" />

            {/* Take Test Form */}
            <form
                onSubmit={onSubmitHandler}
                className="flex flex-col justify-center items-center gap-5"
            >
                {/* Word Count Field */}
                <InputField type="number" label="Word Count" name="word_count" id="word_count" rowCol="row" placeholder="word count" required onChangeHandler={wordCountValueChangeHandler} />

                {/* Duration Field */}
                <InputField type="number" label="Duration (min)" name="duration" id="duration" rowCol="row" required onChangeHandler={durationValueChangeHandler} />

                {/* Submit Button */}
                <Button label="Take Test" />
            </form>
        </CardStructure>
    );
};

export default TakeTestInfoForm;