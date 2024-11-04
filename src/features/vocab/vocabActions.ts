import { AxiosError } from "axios";
import axiosInstance from "../../api/apiInstance";
import { AppDispatch } from "../../app/store";
import { WordMeaningType } from "../../components/AddVocab/AddVocab";
import { addVocabFailure, addVocabStart, addVocabSuccess } from "./vocabSlice";

/* --------------------------------------------------------------------------------------
                                  Vocab Related Functions                                
----------------------------------------------------------------------------------------- */

// add vocab function
export const addVocab = async (word_meaning: WordMeaningType, dispatch: AppDispatch) => {
    dispatch(addVocabStart());
    console.log(word_meaning);
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