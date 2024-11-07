import { useEffect, useState } from "react";
import CardStructure from "../CardComponents/CardStructure";
import CardTitle from "../CardComponents/CardTitle";
import axiosInstance from "../../api/apiInstance";
import { useLocation, useNavigate } from "react-router-dom";
import MCQSingle from "./MCQSingle";
import Button from "../FormComponents/Button";
import Timer from "./Timer";

export type OptionType = string;

export interface MCQType {
    question: string;
    options: OptionType[];
    correct_answer: string;
}
const TakeTest = () => {
    const nav = useNavigate();
    const [testData, setTestData] = useState<MCQType[]>([]);
    const [error, setError] = useState("");
    const [status, setStatus] = useState<"not_yet_started" | "started" | "ended">("not_yet_started");
    const [secondsRemaining, setSecondsRemaining] = useState<number>(0);
    const state = useLocation().state;

    useEffect(() => {
        const N = state.word_count;
        if (!N) {
            nav("/");
        }

        // setting the duration
        setSecondsRemaining(state.duration*60);

        axiosInstance.get(`/apis/vocab/get_N_MCQs/?N=${N}`)
            .then(res => res.data)
            .then(data => {
                setError("");
                setTestData(data);
            })
            .catch(err => {
                setError(err.response.data.detail);
            });
    }, []);

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
    }, [status])


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
                status === "not_yet_started" && <div className="flex flex-col justify-center items-center gap-2">
                    <CardTitle title="Are You Ready To Take The Challenge?" size="text-lg lg:text-xl" />
                    <Button label="Start" onClickHandler={() => setStatus("started")} />
                </div>

                ||

                // test started with given MCQs
                <div className="flex flex-col justify-center items-center gap-7">
                    <CardTitle title="Test Your Memory" />
                    {
                        status==="started" && <Timer totalSeconds={secondsRemaining} label="Time Left" sticky />
                    }
                    <div className="flex flex-col gap-3 md:gap-5 lg:gap-7">
                        {
                            testData.map((data, idx) => <MCQSingle key={idx} data={data} index={idx} total={testData.length} showResult={status === "ended"} />)
                        }
                    </div>
                    {
                        status === "started" && <Button label="Submit" onClickHandler={() => setStatus("ended")} />
                    }
                    {/* {
                        status==="ended" && <Button label="Take Another Test" onClickHandler={() => nav("/take_test")} />
                    } */}
                </div>
            }
        </CardStructure>
    );
};

export default TakeTest;