export default function DefaultButton({className, children, onClick} : {className?: string, children: React.ReactNode, onClick?: () => void}) {
    return (
        <button onClick={onClick} type="button" className={`uppercase bg-[#5348F2] text-center content-center ${className}`}>{children}</button>
    )
}