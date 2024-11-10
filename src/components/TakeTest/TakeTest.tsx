import { useEffect, useState } from "react";
import CardStructure from "../CardComponents/CardStructure";
import CardTitle from "../CardComponents/CardTitle";
import axiosInstance from "../../api/apiInstance";
import { useLocation, useNavigate } from "react-router-dom";
import MCQSingle from "./Test/MCQSingle";
import Button from "../FormComponents/Button";
import Timer from "./Timer";
import TakeTestConfigForm, { TestConfigType } from "./Config/TakeTestConfigForm";
import { useDispatch, useSelector } from "react-redux";
import { faceMCQDataStart, faceMCQDataSuccess } from "../../features/test/testSlice";
import { RootState } from "../../app/store";
import Loader from "../Loader/Loader";
import ResultModal from "./Result/ResultModal";

export interface OptionType {
    id: number,
    value: string;
};

export type SelectedOptionType = OptionType | null;

export interface MCQType {
    question: string;
    options: OptionType[];
    correct_answer: OptionType;
};

export interface ResultStateType {
    time_taken: number;
    total_marks: number;
    gained_marks: number;
    correct_answers: number;
    wrong_answers: number;
    not_attempted: number;
};

const initialTestConfig: TestConfigType = {
    to_from: "e2b",
    word_count: 0,
    duration: 0,
    configSet: false,
    from_today: "false",
};

const initialResultState: ResultStateType = {
    time_taken: 0,
    total_marks: 0,
    gained_marks: 0,
    correct_answers: 0,
    wrong_answers: 0,
    not_attempted: 0,
};

const TakeTest = () => {
    const nav = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    // states
    const isLoading = useSelector((state: RootState) => state.test.loading);
    const [testConfig, setTestConfig] = useState<TestConfigType>(initialTestConfig);
    const [questionsData, setQuestionsData] = useState<MCQType[]>([]);
    const [error, setError] = useState("");
    const [status, setStatus] = useState<"not_yet_started" | "yet_to_start" | "started" | "ended">("not_yet_started");
    const [secondsRemaining, setSecondsRemaining] = useState<number>(0);
    // selected options states
    const [selectedOptions, setSelectedOptions] = useState<SelectedOptionType[]>([]);
    // result state
    const [resultState, setResultState] = useState<ResultStateType>(initialResultState);
    const [showResultModal, setShowResultModal] = useState<boolean>(false);

    // setting the config from location state
    useEffect(() => {
        const cfg: TestConfigType = {
            to_from: location?.state?.to_from || "e2b",
            word_count: location?.state?.word_count || 0,
            duration: location?.state?.duration || 0,
            configSet: location?.state?.configSet || false,
            from_today: location?.state?.from_today || "false",
        };

        // clearing location states
        window.history.replaceState({}, "");

        setTestConfig(cfg);

        if (cfg.configSet) {
            setStatus("yet_to_start");
            setSelectedOptions(new Array(cfg.word_count).fill(null));
        }
    }, []);


    // fetching question data
    useEffect(() => {
        dispatch(faceMCQDataStart());
        axiosInstance.get(`/apis/vocab/get_N_MCQs/?N=${testConfig.word_count}&from_today=${testConfig.from_today}&to_from=${testConfig.to_from}`)
            .then(res => res.data)
            .then(data => {
                setError("");
                setQuestionsData(data);
            })
            .catch(err => {
                setError(err.response.data.detail);
            })
            .finally(() => {
                dispatch(faceMCQDataSuccess());
            });
    }, [testConfig.configSet]);



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
                        clearInterval(intervalId);
                        testSubmitHandler();
                    }
                    return secondsRemaining - 1;
                });
            }, 1000);

            return () => clearTimeout(intervalId);
        }
    }, [status]);


    // test submit handler
    const testSubmitHandler = () => {
        setStatus("ended");

        // calculating result
        const result = selectedOptions.reduce((prevValue, currentValue, currentIndex) => {
            if (currentValue === null) {
                prevValue.not_attempted++;
            }
            else if (questionsData[currentIndex].correct_answer.id === currentValue.id) {
                prevValue.gained_marks++;
                prevValue.correct_answers++;
            }
            else {
                prevValue.gained_marks = prevValue.gained_marks - .25;
                prevValue.wrong_answers++;
            }

            return prevValue;
        }, {
            time_taken: 0,
            total_marks: 0,
            gained_marks: 0,
            correct_answers: 0,
            wrong_answers: 0,
            not_attempted: 0,
        });

        // setting total marks and time taken
        result.total_marks = testConfig.word_count;
        result.time_taken = (testConfig.duration * 60) - secondsRemaining;

        setResultState(result);
        setShowResultModal(true);
    }

    // take test config handler
    const configHandler = (config: TestConfigType) => {
        setTestConfig(config);
        setSelectedOptions(new Array(config.word_count).fill(null));
        setStatus("yet_to_start");
    }

    // take another test onClick handler
    const takeAnotherTestHandler = () => {
        setTestConfig(initialTestConfig);
    }

    if (!testConfig.configSet) {
        return (
            <div className="grid gap-3 md:gap-5 lg:gap-7 row-auto">
                <CardStructure additional_classes="border-none flex justify-center items-center">
                    {/* loader component */}
                    {
                        isLoading && <Loader />
                    }
                    <TakeTestConfigForm configHandler={configHandler} focus />
                </CardStructure>
            </div>
        )
    }


    return (
        <CardStructure additional_classes="border-none">
            {/* loader component */}
            {
                isLoading && <Loader />
            }

            {/* result modal */}
            <ResultModal openModal={showResultModal} setOpenModal={setShowResultModal} resultState={resultState} />


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
                            questionsData.map((data, idx) => <MCQSingle key={idx} data={data} index={idx} total={questionsData.length} showResult={status === "ended"} setSelectedOptions={setSelectedOptions} />)
                        }
                    </div>
                    {
                        status === "started" && <Button label="Submit" onClickHandler={testSubmitHandler} />
                    }
                    {
                        status === "ended" && <div className="flex flex-col md:flex-row justify-center items-center gap-3">
                            <Button label="Show Result" onClickHandler={() => setShowResultModal(true)} />
                            <Button label="Take Another Test" onClickHandler={takeAnotherTestHandler} />
                        </div>
                    }
                </div>
            }
        </CardStructure>
    );
};

export default TakeTest;