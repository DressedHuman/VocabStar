import { createSlice } from "@reduxjs/toolkit";

interface InitialUser {
    userId: number | null;
    first_name: string | null;
    last_name: string | null;
    email: string | null;
};

interface InitialState {
    user: InitialUser | null;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
};

const initialState: InitialState = {
    user: {
        userId: null,
        first_name: null,
        last_name: null,
        email: null,
    },
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        /* -----------------------------------------------------------------------
                               Auth Related reducers                              
        -------------------------------------------------------------------------- */
        registerStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        registerSuccess: (state) => {
            state.loading = false;
            state.error = null;
        },
        registerFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;

            // logging the error to the console
            console.error(action.payload);
        },
        loginStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            state.error = null;

            // saving token to the localStorage
            localStorage.setItem("token", action.payload.token);
        },
        loginFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error_message;
            console.error(action.payload.error_message);
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;

            // removing token from the localStorage
            localStorage.removeItem("token");
        },
        tokenFailure: (state, action) => {
            state.loading = false;
            state.user = null;
            state.isAuthenticated = false;
            state.token = null;
            state.error = null;

            // logging the error to the console
            console.error(action.payload);
        },
    }
});

export const { registerStart, registerSuccess, registerFailure, loginStart, loginSuccess, loginFailure, logout, tokenFailure } = authSlice.actions;
export default authSlice.reducer;