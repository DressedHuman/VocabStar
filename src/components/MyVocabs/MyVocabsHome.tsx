import { useEffect, useState } from "react";
import axiosInstance from "../../api/apiInstance";
import { AxiosError } from "axios";
import { useSearchParams } from "react-router-dom";
import MyVocabs from "./MyVocabs";
import Button from "../FormComponents/Button";

export interface MeaningType {
    id: number;
    meaning: string;
};

export interface UserWordType {
    id: number;
    word: string;
    meanings: MeaningType[];
};

const MyVocabsHome = () => {
    const [userWords, setUserWords] = useState<UserWordType[]>([]);
    const [wordsCount, setWordsCount] = useState<number>(0);
    const [searchParams, setSearchParams] = useSearchParams();

    // user vocabs fetcher
    const faceVocabs = async (pageNum: string | null | undefined) => {
        try {
            const response = await axiosInstance.get(`/apis/vocab/get_user_vocabs/?page=${pageNum}`);
            setUserWords(response.data.vocabs);
            setWordsCount(response.data.words_count);
        } catch (error) {
            if (error instanceof AxiosError) {
                console.error(error);
            }
        }
    }

    // page changer
    const pageChange = (nextOrPrev: "next" | "prev") => {
        let page = searchParams.get("page");
        if (page != null) {
            if (nextOrPrev === "next") {
                page = `${parseInt(page) + 1}`;
            }
            else if (nextOrPrev === "prev") {
                page = `${parseInt(page) - 1}`;
            }
            setSearchParams(currentSearchParams => {
                currentSearchParams.set("page", page as string);
                return currentSearchParams;
            });
        }
        else {
            if (nextOrPrev === "next") {
                setSearchParams(currentSearchParams => {
                    currentSearchParams.set("page", "2");
                    return currentSearchParams;
                });
            }
        }
    }


    // fetching user words
    useEffect(() => {
        const page: string | null = searchParams.get("page");
        faceVocabs(page);
    }, [searchParams.get("page")])

    return (
        <div className="lg:grid lg:grid-cols-5">
            <div className="hidden lg:block"></div>
            <div className="col-span-3 space-y-7">
                <MyVocabs userWords={userWords} />

                {/* prev and next buttons */}
                <div className="flex justify-around items-center">
                    {
                        parseInt(searchParams.get("page") as string) > 1 && parseInt(searchParams.get("page") as string)<=wordsCount && <Button
                            label="Prev"
                            onClickHandler={() => pageChange("prev")}
                        />
                    }
                    {
                        (!searchParams.get("page") || (parseInt(searchParams.get("page") as string)>0 && parseInt(searchParams.get("page") as string) * 10 < wordsCount)) && <Button
                            label="Next"
                            onClickHandler={() => pageChange("next")}
                        />
                    }
                </div>
                <div className="hidden lg:block"></div>
            </div>
        </div>
    );
};

export default MyVocabsHome;