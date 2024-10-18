import { Velustro } from "uvcanvas";
import { useState } from "react";
import { SubHeading } from "../components/SubHeading";
import Header from "../components/Header";
import CustomInput from "../components/CustomInput";
import Heading from "../components/Heading";
import axios from "axios";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import Footer from "../components/VersionFooter";
import { useNavigate } from "react-router-dom";
import { FaBackward } from "react-icons/fa";

export default function SignInPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    async function handleOnClick() {
        try {
            const response = await axios.post("https://my-encryption-app.onrender.com/api/v1/user/login", {
                email: email,
                password: password
            });
            localStorage.setItem("token", response.data.token);
            navigate("/");
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                alert(error.response.data.message);
            } else {
                alert("An unexpected error occurred");
            }
        }
    }

    function handleKeyPress(event: React.KeyboardEvent<HTMLDivElement>) {
        if (event.key === "Enter") {
            handleOnClick();
        }
    }

    return (
        <div className="min-h-screen min-w-full" onKeyPress={handleKeyPress}>
            <div className="absolute inset-0 z-0">
                <Velustro />
                <Header Heading="My Encrypt" />
                <button
                    className="absolute top-7 left-8 text-center p-6 bg-gradient-to-r w-24 from-violet-500 to-violet-700 text-white px-4 py-2 rounded-full flex items-center space-x-2 transition-all hover:from-blue-600 hover:to-blue-800 shadow-lg z-10"
                    onClick={() => navigate("/")}
                >
                    <FaBackward />
                    <span>Back</span>
                </button>
                <div className="absolute inset-0 z-0 flex justify-center items-center">
                    <div
                        className="flex-col bg-gradient-to-tr from-blue-200/90 to-purple-400/90 pb-4 px-3 rounded-lg pt-2 w-80 items-center justify-center text-center"
                    >
                        <Heading label="Login" />
                        <SubHeading label="Enter your credentials to access your account" />
                        <CustomInput
                            Message="Email"
                            placeholder="john.doe@example.com"
                            id="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <CustomInput
                            Message="Password"
                            placeholder="********"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button handleOnClick={handleOnClick} label="Signin" />
                        <BottomWarning to="/SignUp" linkText="SignUp" Text="Don't have an account?" />
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    );
}
