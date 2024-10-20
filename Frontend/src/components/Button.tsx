interface ButtonProps {
    handleOnClick: () => void;
    label: string;
    id: string;
}

export default function Button({ handleOnClick, label }: ButtonProps) {
    return (
        <button
            className="bg-violet-800 px-5 py-2 text-white rounded-lg mt-4 w-full hover:bg-violet-900 hover:cursor-pointer hover:scale-[1.02] transform transition-all duration-300"
            onClick={handleOnClick}
        >
            {label}
        </button>
    )
}
