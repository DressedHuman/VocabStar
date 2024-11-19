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
import { deleteVocabFailure, deleteVocabStart, deleteVocabSuccess, getMyWordsFailure, getMyWordsStart, getMyWordsSuccess } from "../../features/vocab/vocabSlice";
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

interface ShowingResultsFromToType {
    from: number;
    to: number;
}

const MyVocabsHome = () => {
    const nav = useNavigate();
    const dispatch = useDispatch();
    const isWordsLoading = useSelector((state: RootState) => state.vocab.loading);
    const vocabsError = useSelector((state: RootState) => state.vocab.error);
    const [searchParams, setSearchParams] = useSearchParams();

    // states
    const [userVocabs, setUserVocabs] = useState<UserVocabType[]>([]);
    const [vocabsCount, setVocabsCount] = useState<number>(0);
    const [showingResultsFromTo, setShowingResultsFromTo] = useState<ShowingResultsFromToType>({ from: 0, to: 0 });

    // user vocabs fetcher
    const faceVocabs = async (pageNum: string | null | undefined) => {
        dispatch(getMyWordsStart());

        try {
            const response = await axiosInstance.get(`/apis/vocab/get_user_vocabs/?page=${pageNum}`);
            setUserVocabs(response.data.vocabs);
            setVocabsCount(response.data.words_count);
            setShowingResultsFromTo(response.data.from_to);
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


    // delete vocab function
    const deleteVocab = async (word_id: number) => {
        dispatch(deleteVocabStart());

        try {
            const response = await axiosInstance.delete(`/apis/vocab/delete_vocab/?word_id=${word_id}`);
            // remove from the loaded user vocabs
            setUserVocabs(userVocabs => userVocabs.filter(word => word.id!=word_id));
            // reducing the total vocabs count by 1
            setVocabsCount(vocabsCount => vocabsCount-1);

            // dispatching the redux store
            dispatch(deleteVocabSuccess({
                id: word_id,
                message: response.data.detail,
            }));
        } catch (error) {
            if (error instanceof AxiosError) {
                dispatch(deleteVocabFailure({
                    id: word_id,
                    error: error.response?.data?.detail,
                }));
            }
        }
    }


    // fetching user words
    useEffect(() => {
        const page: string | null = searchParams.get("page");
        faceVocabs(page);
    }, [searchParams.get("page"), vocabsCount])

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
            {
                vocabsCount > 0 && <div className="lg:grid lg:grid-cols-5">
                    {/* previous page button for desktop mode */}
                    <div className="hidden lg:flex lg:justify-center lg:items-center">
                        {
                            showingResultsFromTo.from > 10 && <button
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

                    {/* user vocabs list */}
                    <div className="col-span-3 space-y-7">
                        <h2 className="text-center text-white text-lg font-mono font-medium">Showing {showingResultsFromTo.from}-{showingResultsFromTo.to} of {vocabsCount}</h2>

                        {/* my vocabs */}
                        <MyVocabs userVocabs={userVocabs} deleteVocabHandler={deleteVocab} />

                        {/* prev and next buttons for mobile and tablet devices */}
                        <div className="lg:hidden flex flex-col md:flex-row justify-around items-center gap-2">
                            {
                                showingResultsFromTo.from > 10 && 10 < vocabsCount && <Button
                                    label="Prev"
                                    onClickHandler={() => pageChange("prev")}
                                />
                            }
                            {
                                showingResultsFromTo.to < vocabsCount && <Button
                                    label="Next"
                                    onClickHandler={() => pageChange("next")}
                                />
                            }
                        </div>
                    </div>

                    {/* next page button for desktop mode */}
                    <div className="hidden lg:flex lg:justify-center lg:items-center">
                        {
                            showingResultsFromTo.to < vocabsCount && <button
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
            }
        </>
    );
};

export default MyVocabsHome;