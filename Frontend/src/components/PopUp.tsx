import { motion } from "framer-motion";
import { FaShieldAlt } from "react-icons/fa";

interface IsPopUpProps {
    message: string;
    label: string;
    onClose: () => void;
}

export default function PopUp({ message, label, onClose }: IsPopUpProps) {
    return (
        <motion.div className="bg-red-500 w-[30rem] h-[20rem] rounded-md p-4 shadow-lg z-50"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                duration: 500
            }}>
            <p className="text-3xl font-medium text-white flex items-center justify-center mb-2">
                <FaShieldAlt className="w-6 h-6 mr-2" />
                {label}
            </p>
            <div className="flex flex-col justify-center items-center rounded-md bg-white w-full h-[15rem] p-4">
                <div className="text-gray-700 text-center text-2xl font-bold">
                    {message}
                </div>
                <button
                    className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-green-500 hover:shadow-lg"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </motion.div>
    )
}
