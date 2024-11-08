import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
    loading: boolean;
}

const initialState: InitialState = {
    loading: false,
};

const testSlice = createSlice({
    name: "test",
    initialState,
    reducers: {
        /* -----------------------------------------------------------------------------------
                                       Test Related Reducers
        ------------------------------------------------------------------------------------ */
        faceMCQDataStart: (state) => {
            state.loading = true;
        },
        faceMCQDataSuccess: (state) => {
            state.loading = false;
        },
    }
});


export const { faceMCQDataStart, faceMCQDataSuccess } = testSlice.actions;
export default testSlice.reducer;