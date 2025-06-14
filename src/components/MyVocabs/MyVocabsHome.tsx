import { useEffect, useState } from "react";
import axiosInstance from "../../api/apiInstance";
import { AxiosError } from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import MyVocabs from "./MyVocabs";
import Button from "../FormComponents/Button";

import { useDispatch, useSelector } from "react-redux";
import { deleteVocabFailure, deleteVocabStart, deleteVocabSuccess, getMyWordsFailure, getMyWordsStart, getMyWordsSuccess } from "../../features/vocab/vocabSlice";
import { RootState } from "../../app/store";
import Loader from "../Loader/Loader";
import PageContainer from "../UI/PageContainer"; // Import PageContainer
import CenteredContent from "../UI/CenteredContent"; // Import CenteredContent
import CardStructure from "../CardComponents/CardStructure"; // To wrap content sections
import CardTitle from "../CardComponents/CardTitle"; // For section titles if needed

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

    // Determine if "Previous" and "Next" buttons should be disabled
    const isPrevDisabled = showingResultsFromTo.from <= 1; // Assuming 'from' is 1-indexed for the first item
    // If using 0-indexed 'from', it would be showingResultsFromTo.from === 0 or similar
    // For now, assuming 10 items per page, so if 'from' is 1, it's the first page.
    // A more robust way would be to get current page number and total pages from backend.
    const isNextDisabled = showingResultsFromTo.to >= vocabsCount;


    return (
        <PageContainer useNeutralBackground>
            {isWordsLoading && <Loader />}

            {vocabsError && !isWordsLoading && (
                <CenteredContent textAlign="text-center">
                    <CardStructure>
                        <CardTitle title="Error Fetching Vocabularies" />
                        <p className="font-sans text-error text-base mb-4">{vocabsError}</p>
                        <Button label="Go Home" variant="secondary" onClickHandler={() => nav("/")} />
                    </CardStructure>
                </CenteredContent>
            )}

            {!isWordsLoading && !vocabsError && vocabsCount > 0 && (
                <CenteredContent maxWidth="max-w-4xl">
                    <CardStructure>
                        <h2 className="font-sans text-neutral-400 text-center text-base mb-6">
                            Showing {showingResultsFromTo.from}-{showingResultsFromTo.to} of {vocabsCount} words
                        </h2>

                        <MyVocabs userVocabs={userVocabs} deleteVocabHandler={deleteVocab} />

                        {(vocabsCount > 10) &&
                            <div className="flex justify-between items-center mt-6 pt-6 border-t border-neutral-200">
                                <Button
                                    label="Previous"
                                    variant="secondary"
                                    onClickHandler={() => pageChange("prev")}
                                    disabled={isPrevDisabled}
                                />
                                <Button
                                    label="Next"
                                    variant="secondary"
                                    onClickHandler={() => pageChange("next")}
                                    disabled={isNextDisabled}
                                />
                            </div>
                        }
                    </CardStructure>
                </CenteredContent>
            )}

            {!isWordsLoading && !vocabsError && vocabsCount === 0 && (
                 <CenteredContent textAlign="text-center">
                    <CardStructure>
                        <CardTitle title="No Vocabularies Yet" />
                        <p className="font-sans text-neutral-400 mb-6">
                            You haven't added any words to your vocabulary list. Start by adding some new words!
                        </p>
                        <Button label="Add Vocab" variant="primary" onClickHandler={() => nav('/add_vocab')} />
                    </CardStructure>
                </CenteredContent>
            )}
        </PageContainer>
    );
};

export default MyVocabsHome;