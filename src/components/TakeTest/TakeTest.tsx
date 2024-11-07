import { useEffect, useState } from "react";
import CardStructure from "../CardComponents/CardStructure";
import CardTitle from "../CardComponents/CardTitle";
import axiosInstance from "../../api/apiInstance";
import { useLocation, useNavigate } from "react-router-dom";
import MCQSingle from "./MCQSingle";
import Button from "../FormComponents/Button";
import Timer from "./Timer";
import TakeTestConfigForm, { TestConfigType } from "./TakeTestConfigForm";

export type OptionType = string;

export interface MCQType {
    question: string;
    options: OptionType[];
    correct_answer: string;
};

const initialTestConfig: TestConfigType = {
    word_count: 0,
    duration: 0,
    configSet: false,
};

const TakeTest = () => {
    const nav = useNavigate();
    const location = useLocation();
    // states
    const [testConfig, setTestConfig] = useState<TestConfigType>(initialTestConfig);
    const [questionsData, setQuestionsData] = useState<MCQType[]>([]);
    const [error, setError] = useState("");
    const [status, setStatus] = useState<"not_yet_started" | "yet_to_start" | "started" | "ended">("not_yet_started");
    const [secondsRemaining, setSecondsRemaining] = useState<number>(0);

    // setting the config
    useEffect(() => {
        let cfg;
        try {
            cfg = {
                word_count: location.state.word_count,
                duration: location.state.duration,
                configSet: location.state.configSet,
            };
        } catch (error) {
            return console.error(error);
        }

        setTestConfig(cfg);

        if (cfg.configSet) {
            setStatus("yet_to_start")
        }
    }, []);


    // fetching question data
    useEffect(() => {
        axiosInstance.get(`/apis/vocab/get_N_MCQs/?N=${testConfig.word_count}`)
            .then(res => res.data)
            .then(data => {
                setError("");
                setQuestionsData(data);
            })
            .catch(err => {
                setError(err.response.data.detail);
            });
    }, [testConfig]);



    // setting the test duration
    useEffect(() => {
        // setting the duration
        setSecondsRemaining(testConfig.duration * 60);
    }, [testConfig]);


    // timer handler
    useEffect(() => {
        if (status === "started") {
            const intervalId = setInterval(() => {
                setSecondsRemaining(secondsRemaining => {
                    if (secondsRemaining === 0) {
                        setStatus("ended");
                        clearInterval(intervalId);
                    }
                    return secondsRemaining - 1;
                });
            }, 1000);

            return () => clearTimeout(intervalId);
        }
    }, [status]);


    // take test config handler
    const configHandler = (config: TestConfigType) => {
        setTestConfig(config);
        setStatus("yet_to_start");
    }

    // take another test onClick handler
    const takeAnotherTestHandler = () => {
        setTestConfig(initialTestConfig);
        nav(location.pathname, {});
    }

    if (!testConfig.configSet) {
        return (
            <CardStructure additional_classes="border-none flex justify-center items-center">
                <TakeTestConfigForm configHandler={configHandler} />
            </CardStructure>
        )
    }


    return (
        <CardStructure additional_classes="border-none">
            {
                // any error message here
                error && <div className="flex flex-col justify-center items-center gap-2">
                    <CardTitle title={error} />
                    <Button label="Go Home" onClickHandler={() => nav("/")} />
                </div>

                ||

                // ready message with start button
                status === "yet_to_start" && <div className="flex flex-col justify-center items-center gap-2">
                    <CardTitle title="Are You Ready To Take The Challenge?" size="text-lg lg:text-xl" />
                    <Button label="Start" onClickHandler={() => setStatus("started")} />
                </div>

                ||

                // test started with given MCQs
                <div className="flex flex-col justify-center items-center gap-7">
                    <CardTitle title="Test Your Memory" />
                    {
                        status === "started" && <Timer totalSeconds={secondsRemaining} label="Time Left" sticky />
                    }
                    <div className="flex flex-col gap-3 md:gap-5 lg:gap-7">
                        {
                            questionsData.map((data, idx) => <MCQSingle key={idx} data={data} index={idx} total={questionsData.length} showResult={status === "ended"} />)
                        }
                    </div>
                    {
                        status === "started" && <Button label="Submit" onClickHandler={() => setStatus("ended")} />
                    }
                    {
                        status === "ended" && <Button label="Take Another Test" onClickHandler={takeAnotherTestHandler} />
                    }
                </div>
            }
        </CardStructure>
    );
};

export default TakeTest;