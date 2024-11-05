import { AxiosError } from "axios";
import axiosInstance from "../../api/apiInstance";
import { AppDispatch } from "../../app/store";
import { WordMeaningType } from "../../components/AddVocab/AddVocab";
import { addVocabFailure, addVocabStart, addVocabSuccess, checkVocabFailure, checkVocabStart, checkVocabSuccess } from "./vocabSlice";
import { CheckWordMeaningType } from "../../components/CheckVocab/CheckVocab";

/* --------------------------------------------------------------------------------------
                                  Vocab Related Functions                                
----------------------------------------------------------------------------------------- */

// add vocab function
export const addVocab = async (word_meaning: WordMeaningType, dispatch: AppDispatch) => {
    dispatch(addVocabStart());
    try{
        await axiosInstance.post("/apis/vocab/add_vocab/", word_meaning);
        dispatch(addVocabSuccess({word: word_meaning.word}));
    } catch (error) {
        let error_message = "an error occurred";
        if(error instanceof AxiosError) {
            error_message = error.response?.data?.detail?.word[0] || error_message;
        }
        dispatch(addVocabFailure({"word": word_meaning.word, "error": error_message}));
    }
}


// check vocab function
export const checkVocab = async (word: string, setWordMeaning: (word_meanings: CheckWordMeaningType)=> void, dispatch: AppDispatch) => {
    dispatch(checkVocabStart());
    // clearing previous word meanings
    setWordMeaning({
        word: null,
        meanings: [],
    });

    try{
        const response = await axiosInstance.get("/apis/vocab/check_vocab/", {
            params: new URLSearchParams({"word": word}),
        });
        setWordMeaning({
            word: word,
            meanings: response.data.meanings,
        });
        dispatch(checkVocabSuccess({"word": word}));
    } catch (error) {
        let error_message = "an error occurred";
        if(error instanceof AxiosError){
            error_message = error.response?.data?.detail || error_message;
        }
        dispatch(checkVocabFailure({"word": word, "error": error_message}));
    }
}