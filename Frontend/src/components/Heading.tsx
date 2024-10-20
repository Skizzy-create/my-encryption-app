
interface HeadingProps {
    label: string;
}

export default function Heading({ label }: HeadingProps) {
    return (
        <div
            className="font-bold text-4xl pt-6 text-violet-950"
        >{label}</div>
    )
}
