interface SubHeadingProps {
    label: string
}

export function SubHeading({ label }: SubHeadingProps) {
    return <div className=" text-purple-900 text-md pt-2 pb-2 px-4 " >
        {label}
    </div>
};