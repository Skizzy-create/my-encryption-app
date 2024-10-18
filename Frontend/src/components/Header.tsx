interface HeaderProps {
    Heading: string;
}

export default function Header({ Heading }: HeaderProps) {
    return (
        <div className="flex absolute inset-5 text-3xl py-7 justify-center items-center text-center bg-gradient-to-tr text-purple-950 shadow-xl from-blue-200/90 to-purple-400/90 h-10 rounded-md font-bold">
            {Heading}
        </div>
    )
}
