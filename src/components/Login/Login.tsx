import { useNavigate } from "react-router-dom";
// import CardStructure from "../CardComponents/CardStructure"; // Removed
import Button from "../FormComponents/Button";
import InputField from "../FormComponents/InputField";
// import CardTitle from "../CardComponents/CardTitle"; // Removed
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
        <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-100 py-12 px-4 sm:px-6 lg:px-8">
            {/* loader component */}
            {
                isLoading && <Loader />
            }

            {/* Login Card Container */}
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                {/* Card Title - Assuming CardTitle component will adapt or be styled appropriately.
                    Ideally, CardTitle itself would use font-heading, text-primary etc.
                    For now, ensuring the text here is clear. */}
                <h2 className="font-heading text-2xl text-primary text-center mb-6">Login Here</h2>

                {/* Login Form */}
                <form
                    onSubmit={loginHandler}
                    className="flex flex-col gap-6" // Updated gap
                >
                    {/* Email Field */}
                    <InputField
                        type="email"
                        id="email"
                        name="email"
                        label="Your Email"
                        placeholder="you@example.com"
                        required
                        autoFocus // Renamed from focus, removed lang
                    />

                    {/* Password Field */}
                    <InputField
                        type="password"
                        id="password"
                        name="password"
                        label="Password"
                        placeholder="••••••••"
                        required
                    />

                    {/* submission error */}
                    {loginError && <FormError errorText={loginError} />}

                    {/* Login Button */}
                    <Button label="Login" button_type="submit" variant="primary" additional_classes="w-full" />
                </form>
            </div>

            {/* Registration Prompt */}
            <div className="mt-6 text-center">
                <p className="text-sm text-neutral-400">Don't have an account?</p>
                <Button
                    label="Register Here"
                    variant="secondary" // Using secondary style for this button
                    onClickHandler={() => nav("/register")}
                    additional_classes="mt-2"
                />
            </div>
        </div>
    );
};

export default Login;