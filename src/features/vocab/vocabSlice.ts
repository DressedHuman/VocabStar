import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";


interface InitialState {
    loading: boolean;
    error: string | null;
    successfull: boolean;
};

const initialState: InitialState = {
    loading: false,
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
            state.error = null;
            state.successfull = false;
        },
        addVocabSuccess: (state, action) => {
            state.loading = false;
            state.error = null;
            state.successfull = true;

            // showing success toast
            toast.success("Vocab Added Successfully!", {
                toastId: action.payload.word,
            });
        },
        addVocabFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
            state.successfull = false;

            // showing error toast
            toast.error(action.payload.error, {
                toastId: `${action.payload.word}_failed`,
            });
        }
    }
});

export const { addVocabStart, addVocabSuccess, addVocabFailure } = vocabSlice.actions;
export default vocabSlice.reducer;