import { useNavigate } from "react-router-dom";
import CardStructure from "../CardComponents/CardStructure";
import Button from "../FormComponents/Button";
import InputField from "../FormComponents/InputField";
import CardTitle from "../CardComponents/CardTitle";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/auth/authActions";
import { RootState } from "../../app/store";
import FormError from "../FormComponents/FormError";
import { useEffect } from "react";
import Loader from "../Loader/Loader";

export interface CredentialsType {
    email: string;
    password: string;
};

const Login: React.FC = () => {
    const nav = useNavigate();
    const dispatch = useDispatch();

    // states
    const isLoading = useSelector((state: RootState) => state.auth.loading);
    const loginError = useSelector((state: RootState) => state.auth.error);
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    const loginHandler = (e: React.FormEvent) => {
        e.preventDefault();
        const form = new FormData(e.target as HTMLFormElement);

        const credentials: CredentialsType = {
            email: form.get("email") as string,
            password: form.get("password") as string,
        };
        login(credentials, dispatch);
    }

    useEffect(() => {
        if (isAuthenticated) {
            nav('/');
        }
    })

    return (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-7">
            {/* loader component */}
            {
                isLoading && <Loader />
            }

            {/* login card */}
            <CardStructure additional_classes="md:col-span-3 md:border-y-0 md:border-l-0 md:rounded-none">
                {/* Card Title */}
                <CardTitle title="Login Here" />

                {/* Login Form */}
                <form
                    onSubmit={loginHandler}
                    className="flex flex-col justify-between items-center gap-4"
                >
                    {/* Email Field */}
                    <InputField type="email" id="email" name="email" label="Your Email" lang="en" placeholder="type email" required focus />

                    {/* Password Field */}
                    <InputField type="password" id="password" name="password" label="Password" placeholder="type password" required />

                    {/* submission error */}
                    {loginError && <FormError errorText={loginError} />}

                    {/* Login Button */}
                    <Button label="Login" button_type="submit" />
                </form>
            </CardStructure>

            {/* right sidebar */}
            <div className="md:col-span-2 flex flex-col justify-center items-center gap-1 md:gap-2 lg:gap-3">
                <h3 className="text-center text-xl text-app_name font-ubuntu">Don't have an account?</h3>
                <Button label="Register Here" onClickHandler={() => nav("/register")} />
            </div>
        </div>
    );
};

export default Login;