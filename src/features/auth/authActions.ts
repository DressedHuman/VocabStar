import { AxiosError } from "axios";
import axiosInstance from "../../api/apiInstance";
import { AppDispatch } from "../../app/store";
import { loginFailure, loginStart, loginSuccess, logout, registerFailure, registerStart, registerSuccess, tokenFailure } from "./authSllice"
import { CredentialsType } from "../../components/Login/Login";
import { RegistrationDataType } from "../../components/Register/Register";
import { NavigateFunction } from "react-router-dom";


// register function
export const register = async (userDetails: RegistrationDataType, nav: NavigateFunction, dispatch: AppDispatch) => {
    dispatch(registerStart());
    try {
        await axiosInstance.post("/apis/user/register/", userDetails);
        dispatch(registerSuccess());
        nav("/login");
    }
    catch (error) {
        let errorMessage = "an error occurred while registering";
        if (error instanceof AxiosError) {
            errorMessage = error.response?.data?.detail || errorMessage;
        }

        dispatch(registerFailure(errorMessage));
    }
}


// login function
export const login = async (credentials: CredentialsType, dispatch: AppDispatch) => {
    dispatch(loginStart());
    try {
        const response = await axiosInstance.post('/apis/user/login/', credentials);
        dispatch(loginSuccess({ user: response.data.user, token: response.data.token }));
    } catch (error) {
        let errorMessage = "an error occurred";
        if (error instanceof AxiosError) {
            errorMessage = error.response?.data?.detail || errorMessage;
        }

        dispatch(loginFailure({ "error_message": errorMessage }))
    }
}

// get user info function with token
export const get_user_info_with_token = async (token: string, dispatch: AppDispatch) => {
    dispatch(loginStart());
    try {
        const response = await axiosInstance.get("/apis/user/get_user_info/");
        // token is valid, so logging in user
        dispatch(loginSuccess({ user: response.data.user, token }));
    } catch (error) {
        let errorMessage = "an error occurred";
        if (error instanceof AxiosError) {
            errorMessage = error.response?.data?.detail || errorMessage;
        }
        console.log("from get_user_info_with_token", errorMessage);
        dispatch(tokenFailure(errorMessage));

        // invalid token, so removing from the localStorage
        localStorage.removeItem("token");
    }
}

// logout function
export const logoutUser = () => async (dispatch: AppDispatch) => {
    try {
        await axiosInstance.post("/apis/user/logout/");
    } catch (error) {
        console.error("Logout failed", error);
    }
    dispatch(logout());
}