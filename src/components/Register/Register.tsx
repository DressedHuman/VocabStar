import { useNavigate } from "react-router-dom";
import CardStructure from "../CardComponents/CardStructure";
import Button from "../FormComponents/Button";
import InputField from "../FormComponents/InputField";
import CardTitle from "../CardComponents/CardTitle";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { register } from "../../features/auth/authActions";
import FormError from "../FormComponents/FormError";
import InputPhoneNumber from "../FormComponents/InputPhoneNumber";
import Loader from "../Loader/Loader";

export interface RegistrationDataType {
    first_name: string;
    last_name: string;
    university: string;
    phone_num: string;
    email: string;
    password: string;
};

const Register: React.FC = () => {
    const nav = useNavigate();
    const dispatch = useDispatch();

    // states
    const isLoading = useSelector((state: RootState) => state.auth.loading);
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const registerError = useSelector((state: RootState) => state.auth.error);

    // register handler
    const registerHandler = (e: React.FormEvent) => {
        e.preventDefault();
        const form = new FormData(e.target as HTMLFormElement);

        const data: RegistrationDataType = {
            "first_name": form.get("first_name") as string,
            "last_name": form.get("last_name") as string,
            "university": form.get("university") as string,
            "phone_num": form.get("phone_num") as string,
            "email": form.get("email") as string,
            "password": form.get("password") as string,
        };
        register(data, nav, dispatch);
    }

    useEffect(() => {
        if (isAuthenticated) {
            nav("/");
        }
    })

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-100 py-12 px-4 sm:px-6 lg:px-8">
            {/* loader component */}
            {
                isLoading && <Loader />
            }

            {/* Registration Card Container */}
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg"> {/* max-w-lg for more fields */}
                {/* Card Title */}
                <h2 className="font-heading text-2xl text-primary text-center mb-6">Create an Account</h2>

                {/* Registration Form */}
                <form
                    onSubmit={registerHandler}
                    className="flex flex-col gap-4" // items-stretch is default for block elements like InputField's div
                >
                    {/* First Name Field */}
                    <InputField id="first_name" name="first_name" label="First Name" placeholder="John" required autoFocus />

                    {/* Last Name Field */}
                    <InputField id="last_name" name="last_name" label="Last Name" placeholder="Doe" required />
                    
                    {/* University Field */}
                    <InputField id="university" name="university" label="University" placeholder="Example University" required />

                    {/* Phone Number Field */}
                    <InputPhoneNumber id="phone_num" name="phone_num" label="Phone Number" placeholder="+880 1XXXXXXXXX" required />

                    {/* Email Field */}
                    <InputField type="email" id="email" name="email" label="Email Address" placeholder="you@example.com" required />

                    {/* Password Field */}
                    <InputField type="password" id="password" name="password" label="Password" placeholder="••••••••" required />

                    {/* Submission Error */}
                    {registerError && <FormError errorText={registerError} />}

                    {/* Register Button */}
                    <Button label="Create Account" button_type="submit" variant="primary" additional_classes="w-full mt-2" />
                </form>
            </div>

            {/* Login Prompt */}
            <div className="mt-6 text-center">
                <p className="text-sm text-neutral-400">Already have an account?</p>
                <Button
                    label="Login Here"
                    variant="secondary"
                    onClickHandler={() => nav("/login")}
                    additional_classes="mt-2"
                />
            </div>
        </div>
    );
};

export default Register;