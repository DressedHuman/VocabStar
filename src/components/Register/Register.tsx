import { useNavigate } from "react-router-dom";
import CardStructure from "../CardComponents/CardStructure";
import Button from "../FormComponents/Button";
import InputField from "../FormComponents/InputField";
import CardTitle from "../CardComponents/CardTitle";

interface RegistrationDataType {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
};

const Register: React.FC = () => {
    const nav = useNavigate();

    // register handler
    const registerHandler = (e: React.FormEvent) => {
        e.preventDefault();
        const form = new FormData(e.target as HTMLFormElement);

        const data: RegistrationDataType = {
            "first_name": form.get("first_name") as string,
            "last_name": form.get("last_name") as string,
            "email": form.get("email") as string,
            "password": form.get("password") as string,
        };

        console.log(data);
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-7">
            <CardStructure additional_classes="md:col-span-3 md:border-y-0 md:border-l-0 md:rounded-none">
                {/* Card Title */}
                <CardTitle title="Register Here" />

                {/* Registration Form */}
                <form
                    onSubmit={registerHandler}
                    className="flex flex-col justify-center items-center gap-4"
                >
                    {/* First Name Field */}
                    <InputField id="first_name" name="first_name" label="Your First Name" placeholder="type first name" />

                    {/* Last Name Field */}
                    <InputField id="last_name" name="last_name" label="Your Last Name" placeholder="type last name" />

                    {/* Email Field */}
                    <InputField type="email" id="email" name="email" label="Your Email" placeholder="type email" required />

                    {/* Password Field */}
                    <InputField type="password" id="password" name="password" label="Password" placeholder="type password" required />

                    {/* Login Button */}
                    <Button label="Register" button_type="submit" />
                </form>
            </CardStructure>

            {/* Right Sidebar */}
            <div className="md:col-span-2 flex flex-col justify-center items-center gap-1 md:gap-2 lg:gap-3">
                <h3 className="text-center text-xl text-app_name font-ubuntu">Already have an account?</h3>
                <Button label="Login Here" onClickHandler={() => nav("/login")} />
            </div>
        </div>
    );
};

export default Register;