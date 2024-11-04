import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from '../features/auth/authSllice';
import VocabReducer from '../features/vocab/vocabSlice';

const store = configureStore({
    reducer: {
        auth: AuthReducer,
        vocab: VocabReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;