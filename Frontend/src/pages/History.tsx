import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HistoryCard from "../components/HistoryCard";

const Trial = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate("/login");
        }
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 via-cyan-500 to-indigo-500 p-8 flex flex-col items-center justify-center">
            <header className="flex justify-between w-full max-w-4xl p-4">
                <h1 className="text-2xl font-bold text-white">Encryption App</h1>
                <button className="bg-white text-gray-800 px-4 py-2 rounded-lg">
                    User
                </button>
            </header>
            <div className="z-10">
                <HistoryCard />
            </div>
        </div>
    );
};

export default Trial;
