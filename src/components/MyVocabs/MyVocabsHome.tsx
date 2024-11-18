import { useEffect, useState } from "react";
import axiosInstance from "../../api/apiInstance";
import { AxiosError } from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import MyVocabs from "./MyVocabs";
import Button from "../FormComponents/Button";

// icons
import leftIcon from './icons/left.svg';
import rightIcon from './icons/right.svg';
import { useDispatch, useSelector } from "react-redux";
import { getMyWordsFailure, getMyWordsStart, getMyWordsSuccess } from "../../features/vocab/vocabSlice";
import { RootState } from "../../app/store";
import Loader from "../Loader/Loader";

export interface MeaningType {
    id: number;
    meaning: string;
};

export interface UserVocabType {
    id: number;
    word: string;
    meanings: MeaningType[];
};

const MyVocabsHome = () => {
    const nav = useNavigate();
    const dispatch = useDispatch();
    const isWordsLoading = useSelector((state: RootState) => state.vocab.loading);
    const vocabsError = useSelector((state: RootState) => state.vocab.error);
    const [searchParams, setSearchParams] = useSearchParams();

    // states
    const [userVocabs, setUserVocabs] = useState<UserVocabType[]>([]);
    const [vocabsCount, setVocabsCount] = useState<number>(0);

    // user vocabs fetcher
    const faceVocabs = async (pageNum: string | null | undefined) => {
        dispatch(getMyWordsStart());

        try {
            const response = await axiosInstance.get(`/apis/vocab/get_user_vocabs/?page=${pageNum}`);
            setUserVocabs(response.data.vocabs);
            setVocabsCount(response.data.words_count);
            dispatch(getMyWordsSuccess());
        } catch (error) {
            if (error instanceof AxiosError) {
                setUserVocabs([]);
                dispatch(getMyWordsFailure({ "message": error.response?.data?.detail }));
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
        <>
            {/* if the words are still loading, display the loader */}
            {
                isWordsLoading && <Loader />
            }

            {/* display errors if there is any */}
            {
                vocabsError && <div className="flex flex-col justify-center items-center gap-3">
                    <p className="text-[gold] text-xl md:text-2xl font-mono">{vocabsError}</p>
                    <Button label="Go Home" onClickHandler={() => nav("/")} />
                </div>
            }

            {/* the words of the user after loading */}
            <div className="lg:grid lg:grid-cols-5">
                <div className="hidden lg:flex lg:justify-center lg:items-center">
                    {
                        parseInt(searchParams.get("page") as string) > 1 && parseInt(searchParams.get("page") as string) <= vocabsCount && <button
                            onClick={() => pageChange("prev")}
                            className="text-white py-7 px-4 text-5xl hover:bg-bg_color"
                        >
                            <img
                                src={leftIcon}
                                className="w-7"
                            />
                        </button>
                    }
                </div>
                <div className="col-span-3 space-y-7">
                    <MyVocabs userWords={userVocabs} />

                    {/* prev and next buttons */}
                    <div className="lg:hidden flex flex-col md:flex-row justify-around items-center gap-2">
                        {
                            parseInt(searchParams.get("page") as string) > 1 && (parseInt(searchParams.get("page") as string) - 1) * 10 <= vocabsCount && 10 < vocabsCount && <Button
                                label="Prev"
                                onClickHandler={() => pageChange("prev")}
                            />
                        }
                        {
                            (!searchParams.get("page") && 10 < vocabsCount) || ((parseInt(searchParams.get("page") as string) > 0 && parseInt(searchParams.get("page") as string) * 10 < vocabsCount)) && <Button
                                label="Next"
                                onClickHandler={() => pageChange("next")}
                            />
                        }
                    </div>
                </div>
                <div className="hidden lg:flex lg:justify-center lg:items-center">
                    {
                        (!searchParams.get("page") && 10 < vocabsCount) || ((parseInt(searchParams.get("page") as string) > 0 && parseInt(searchParams.get("page") as string) * 10 < vocabsCount)) && <button
                            onClick={() => pageChange("next")}
                            className="text-white py-7 px-4 text-5xl hover:bg-bg_color"
                        >
                            <img
                                src={rightIcon}
                                className="w-7"
                            />
                        </button>
                    }
                </div>
            </div>
        </>
    );
};

export default MyVocabsHome;