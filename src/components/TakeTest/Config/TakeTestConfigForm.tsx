import { useState } from "react";
import CardStructure from "../../CardComponents/CardStructure";
import Button from "../../FormComponents/Button";
import Checkbox from "../../FormComponents/CheckBox/CheckBox";
import InputField from "../../FormComponents/InputField";
import ConfigFormHeader, { LangType } from "./ConfigFormHeader";

export interface TestConfigType {
    to_from: "e2b" | "b2e";
    word_count: number;
    duration: number;
    configSet: boolean;
    from_recent_only: "true" | "false";
};

export interface ToFromLangs {
    to: LangType;
    from: LangType;
};

interface Props {
    configHandler: (config: TestConfigType) => void;
    autoFocus?: boolean; // Renamed from focus
};


const initialLangsValue: ToFromLangs = {
    // Defaulting to English -> Bengali, can be changed by user
    from: {
        id: "e",
        name: "English",
    },
    to: {
        id: "b",
        name: "Bengali",
    },
};

const TakeTestConfigForm = ({ configHandler, autoFocus }: Props) => { // Renamed prop
    const [toFromLangs, setToFromLangs] = useState<ToFromLangs>(initialLangsValue);
    const [fromRecentOnly, setFromRecentOnly] = useState<boolean>(false);

    // Word Count Value Change Handler
    const wordCountValueChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = parseFloat(e.target.value);
        if (value < 1) {
            e.target.value = "1";
        }
        else {
            value = Math.round(value);
            e.target.value = `${value}`;
        }
    }

    // Duration Field Value Change Handler
    const durationValueChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = parseFloat(e.target.value);
        if (value < 1) {
            e.target.value = "1";
        }
        else {
            value = Math.round(value);
            e.target.value = `${value}`;
        }
    }

    // Form On Submit Handler
    const onSubmitHandler = (e: React.FormEvent) => {
        e.preventDefault();
        const form = new FormData(e.target as HTMLFormElement);

        const take_test_config: TestConfigType = {
            "to_from": `${toFromLangs.from.id}2${toFromLangs.to.id}` as "e2b" | "b2e",
            "word_count": parseInt(form.get("word_count") as string),
            "duration": parseInt(form.get("duration") as string),
            "configSet": true,
            "from_recent_only": fromRecentOnly ? "true" : "false",
        };

        configHandler(take_test_config);
    }

    return (
        // Centered card for the configuration form
        <CardStructure additional_classes="max-w-lg mx-auto">
            <ConfigFormHeader fromLang={toFromLangs.from} toLang={toFromLangs.to} swapper={setToFromLangs} />

            <form
                onSubmit={onSubmitHandler}
                className="flex flex-col items-stretch gap-6" // items-stretch for full width, increased gap
            >
                {/* Input fields arranged vertically */}
                <InputField
                    type="number"
                    label="Number of Words" // Clearer label
                    name="word_count"
                    id="word_count"
                    layout="row" // Use new layout prop
                    placeholder="e.g., 10"
                    required
                    onChangeHandler={wordCountValueChangeHandler}
                    autoFocus={autoFocus} // Use renamed prop
                />
                <InputField
                    type="number"
                    label="Duration (minutes)" // Clearer label
                    name="duration"
                    id="duration"
                    layout="row"
                    placeholder="e.g., 5"
                    required
                    onChangeHandler={durationValueChangeHandler}
                />
                <div className="flex justify-center"> {/* Centering checkbox */}
                  <Checkbox
                      label="Test from recent words only" // Clearer label
                      defaultChecked={false}
                      showCross={false} // Cross not needed for this type of checkbox
                      onChange={() => setFromRecentOnly(!fromRecentOnly)}
                  />
                </div>
                <Button label="Start Test" variant="primary" type="submit" additional_classes="w-full mt-2" />
            </form>
        </CardStructure>
    );
};

export default TakeTestConfigForm;