export default function Collapse({className, name, children, id}:{className?: string, name:string, children: React.ReactNode, id: string}){
    return (
        <div className={`bg-[#282828] flex flex-col gap-4 p-3 h-fit ${className}`}>
            <input type="checkbox" id={id} className={`hidden peer`}/>
            <label htmlFor={id} className={`peer-checked:hidden cursor-pointer flex gap-2 items-center`}>
                <svg className="rotate-180" width="12" height="9" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 6L5 1L9 6" stroke="white" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <h1>{name}</h1>
            </label>
            <label htmlFor={id} className={`cursor-pointer hidden gap-2 items-center peer-checked:flex`}>
                <svg width="12" height="9" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 6L5 1L9 6" stroke="white" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <h1>{name}</h1>
            </label>
            <div className={`overflow-y-scroll h- flex-col gap-2 hidden peer-checked:flex`}>
                {children}
            </div>
        </div>
    )
}