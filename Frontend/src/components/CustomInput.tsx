type CustomInputProps = {
    Message: string;
    placeholder: string;
    id: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const CustomInput: React.FC<CustomInputProps> = ({ Message, placeholder, id, onChange }) => {
    return (
        <div className="flex flex-col ">
            <label
                className="text-sm font-medium text-left py-1 px-1  text-purple-950 "
                id={id}
            >{Message}</label>
            <input
                className="p-2 rounded-md border-2 border-purple-400 bg-purple-100 focus:outline-purple-600 w-full mb-1 "
                type={Message.toLowerCase() === "password" ? "password" : "text"}
                placeholder={placeholder}
                onChange={onChange}
            />
        </div>
    );
};

export default CustomInput;
