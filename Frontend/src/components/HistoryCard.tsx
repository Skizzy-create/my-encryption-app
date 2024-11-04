import axios from "axios";
import { useEffect, useState } from "react";
import PopUp from "./PopUp";

export default function HistoryCard() {
    const [encryptedMessages, setEncryptedMessages] = useState([]);
    const [decryptedMessages, setDecryptedMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [view, setView] = useState<"encrypted" | "decrypted">("encrypted");
    const onCLose = () => {
        setError(null);
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5173/api/v1/messages/history', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setEncryptedMessages(response.data.encryptedMessages);
                setDecryptedMessages(response.data.decryptedMessages);
            } catch (err) {
                setError("Failed to load messages.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-8 rounded-lg shadow-2xl w-full max-w-2xl">
            <div className="text-xl font-bold text-center mb-4 text-white">History Messages</div>
            <div className="flex justify-center space-x-4 mb-4">
                <button
                    onClick={() => setView("encrypted")}
                    className={`py-2 px-6 rounded-lg font-medium ${view === "encrypted" ? "bg-white text-gray-800" : "bg-gray-100 text-gray-600"}`}
                >
                    Encrypted
                </button>
                <button
                    onClick={() => setView("decrypted")}
                    className={`py-2 px-6 rounded-lg font-medium ${view === "decrypted" ? "bg-white text-gray-800" : "bg-gray-100 text-gray-600"}`}
                >
                    Decrypted
                </button>
            </div>
            {loading ? (
                <div className="text-center text-gray-200">Loading...</div>
            ) : error ? (
                <div className="text-center text-red-600">
                    <PopUp message={error} label="Error" onClose={onCLose} />
                </div>
            ) : (
                <div className="bg-white bg-opacity-60 p-4 rounded-lg shadow-inner">
                    {view === "encrypted" ? (
                        <div className="space-y-4">
                            {encryptedMessages.map(({ message, algo, createdAt }, index) => (
                                <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-sm" key={index}>
                                    <div>
                                        <div className="text-sm font-semibold text-gray-700">{algo}</div>
                                        <div className="text-xs text-gray-500">{formatDate(createdAt)}</div>
                                    </div>
                                    <div className="text-sm truncate w-1/2">{message}</div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {decryptedMessages.map(({ message, algo, createdAt }, index) => (
                                <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-sm" key={index}>
                                    <div>
                                        <div className="text-sm font-semibold text-gray-700">{algo}</div>
                                        <div className="text-xs text-gray-500">{formatDate(createdAt)}</div>
                                    </div>
                                    <div className="text-sm truncate w-1/2">{message}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            )}
        </div>
    );
}
