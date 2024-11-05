import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";


interface InitialState {
    loading: boolean;
    vocab_action: "add" | "check" | null;
    error: string | null;
    successfull: boolean;
};

const initialState: InitialState = {
    loading: false,
    vocab_action: null,
    error: null,
    successfull: false,
}

const vocabSlice = createSlice({
    name: "vocab",
    initialState,
    reducers: {
        /* ----------------------------------------------------------------------------------------
                                         Vocab Related Reducers                                    
        -------------------------------------------------------------------------------------------- */
        addVocabStart: (state) => {
            state.loading = true;
            state.vocab_action = "add";
            state.error = null;
            state.successfull = false;
        },
        addVocabSuccess: (state, action) => {
            state.loading = false;
            state.vocab_action = "add";
            state.error = null;
            state.successfull = true;

            // showing success toast
            toast.success("Vocab Added Successfully!", {
                toastId: `${action.payload.word}_success`,
            });
        },
        addVocabFailure: (state, action) => {
            state.loading = false;
            state.vocab_action = "add";
            state.error = action.payload.error;
            state.successfull = false;

            // showing error toast
            toast.error(action.payload.error, {
                toastId: `${action.payload.word}_failed`,
            });
        },
        checkVocabStart: (state) => {
            state.loading = true;
            state.vocab_action = "check";
            state.error = null;
            state.successfull = false;
        },
        checkVocabSuccess: (state, action) => {
            state.loading = false;
            state.vocab_action = "check";
            state.error = null;
            state.successfull = true;

            // showing success toast
            toast.success(`${action.payload.word} found!`, {
                toastId: `${action.payload.word}_found`,
            })
        },
        checkVocabFailure: (state, action) => {
            state.loading = false;
            state.vocab_action = "check";
            state.error = action.payload.error;
            state.successfull = false;

            // showing failure toast
            toast.error(action.payload.error, {
                toastId: `${action.payload.word}_failed`,
            })
        }
    }
});

export const { addVocabStart, addVocabSuccess, addVocabFailure, checkVocabStart, checkVocabSuccess, checkVocabFailure } = vocabSlice.actions;
export default vocabSlice.reducer;