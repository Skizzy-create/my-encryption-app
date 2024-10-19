import { FaForward } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Continue() {
    const navigate = useNavigate(); // Make sure to call the useNavigate hook

    return (
        <button
            className="absolute top-7 right-8 text-center bg-gradient-to-r w-32 h-10 from-violet-500 to-violet-700 text-white rounded-full flex items-center justify-center space-x-2 transition-all hover:from-blue-600 hover:to-blue-800 shadow-lg z-10"
            onClick={() => navigate("/MainPage")} // Proper usage of navigate
        >
            <FaForward className="text-lg" />
            <span className="text-lg font-semibold">Continue</span>
        </button>
    );
}
