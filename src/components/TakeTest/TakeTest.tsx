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
import PageContainer from "../UI/PageContainer"; // Import reusable PageContainer
import CenteredContent from "../UI/CenteredContent"; // Import reusable CenteredContent

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
    from_recent_only: "false",
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
            from_recent_only: location?.state?.from_recent_only || "false",
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
        axiosInstance.get(`/apis/vocab/get_N_MCQs/?N=${testConfig.word_count}&from_recent_only=${testConfig.from_recent_only}&to_from=${testConfig.to_from}`)
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
        setStatus("not_yet_started"); // Reset status to allow re-config
        setShowResultModal(false); // Hide result modal
    }

    }

    if (!testConfig.configSet) {
        return (
            <PageContainer useNeutralBackground> {/* Added useNeutralBackground for consistency */}
                {isLoading && <Loader />}
                <TakeTestConfigForm configHandler={configHandler} autoFocus />
            </PageContainer>
        )
    }

    return (
        <PageContainer useNeutralBackground> {/* Added useNeutralBackground */}
            {isLoading && <Loader />}

            <ResultModal openModal={showResultModal} setOpenModal={setShowResultModal} resultState={resultState} takeAnotherTestHandler={takeAnotherTestHandler} />

            {error && (
                <CenteredContent textAlign="text-center"> {/* Ensure text-center is applied */}
                    <CardStructure>
                        <CardTitle title="Error" />
                        <p className="font-sans text-error text-base mb-4">{error}</p>
                        <Button label="Go Home" variant="secondary" onClickHandler={() => nav("/")} />
                    </CardStructure>
                </CenteredContent>
            )}

            {!error && status === "yet_to_start" && (
                <CenteredContent textAlign="text-center"> {/* Ensure text-center is applied */}
                     <CardStructure>
                        <CardTitle title="Are You Ready?" additional_classes="text-2xl" />
                        <p className="text-neutral-400 font-sans mb-6">
                            You are about to start a test with {testConfig.word_count} questions and a duration of {testConfig.duration} minutes.
                        </p>
                        <Button label="Start Test" variant="primary" onClickHandler={() => setStatus("started")} additional_classes="w-full sm:w-auto"/>
                    </CardStructure>
                </CenteredContent>
            )}

            {!error && (status === "started" || status === "ended") && questionsData.length > 0 && (
                // Using CenteredContent with a wider maxWidth for the test questions area
                <CenteredContent maxWidth="max-w-3xl">
                    {status === "started" && <Timer totalSeconds={secondsRemaining} label="Time Left" sticky />}

                    <CardTitle title="Test Your Knowledge" additional_classes="my-6 text-center" /> {/* text-center from CenteredContent might be enough */}
                    <div className="flex flex-col gap-4 md:gap-6">
                        {questionsData.map((data, idx) => (
                            <MCQSingle
                                key={idx}
                                data={data}
                                index={idx}
                                total={questionsData.length}
                                showResult={status === "ended"}
                                setSelectedOptions={setSelectedOptions}
                                disabled={status === "ended"}
                            />
                        ))}
                    </div>

                    {status === "started" && (
                        <div className="mt-8 text-center">
                            <Button label="Submit Test" variant="primary" onClickHandler={testSubmitHandler} additional_classes="w-full sm:w-auto" />
                        </div>
                    )}

                    {status === "ended" && (
                        <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
                            <Button label="Show Detailed Result" variant="primary" onClickHandler={() => setShowResultModal(true)} />
                            <Button label="Take Another Test" variant="secondary" onClickHandler={takeAnotherTestHandler} />
                        </div>
                    )}
                </CenteredContent>
            )}
             {!error && (status === "started" || status === "ended") && questionsData.length === 0 && !isLoading && (
                <CenteredContent textAlign="text-center"> {/* Ensure text-center is applied */}
                    <CardStructure>
                        <CardTitle title="Loading Questions..." />
                        <p className="font-sans text-neutral-400">Please wait while the questions are being prepared.</p>
                    </CardStructure>
                </CenteredContent>
            )}
        </PageContainer>
    );
};

export default TakeTest;