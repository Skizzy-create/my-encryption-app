import { Link } from "react-router-dom";

interface BottomWarningProps {
    Text: string;
    to: string;
    linkText: string;
}

export default function BottomWarning({ Text, to, linkText }: BottomWarningProps) {
    return (
        <div className="text-sm py-2">
            {Text}
            <Link
                to={to}
                className="pointer underline cursor-pointer pl-1"
            >
                {linkText}
            </Link>
        </div>
    )
}
