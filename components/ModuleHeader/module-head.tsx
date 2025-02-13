import Link from "next/link";

export default function Head({text, active, topic, number}: {text: string, active: boolean; topic: string; number: number }) {
    if (active) {
        return (
            <>
                <Link className="flex items-center gap-1 mt-14" href={`/learn`}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="#FFFFFF99">
                        <path
                            fillRule="evenodd"
                            d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
                        />
                    </svg>
                    <h3 className="text-[#FFFFFF99] text-sm sm:text-base">{text.toUpperCase()} {number}</h3>
                </Link>
                <div className="bg-[#5046E5] w-full rounded-3xl p-4 flex flex-col justify-center mt-2 mb-8 min-h-24">
                    <h1 className="text-xl sm:text-3xl text-center">{topic}</h1>
                </div>
            </>
        );
    }
    else {
        return (
            <div className="w-full h-24 rounded-3xl text-[#91898C] p-4 flex flex-col justify-center mt-16 mb-8">
                <div className="flex items-center gap-3 justify-center">
                    <svg
                        width="61"
                        height="1"
                        viewBox="0 0 61 1"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <line y1="0.5" x2="61" y2="0.5" stroke="#91898C"/>
                    </svg>
                    <h1 className="text-xl sm:text-3xl text-center">{topic}</h1>
                    <svg
                        width="61"
                        height="1"
                        viewBox="0 0 61 1"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <line y1="0.5" x2="61" y2="0.5" stroke="#91898C"/>
                    </svg>
                </div>
                <div className="flex items-center gap-1 justify-center w-full">
                    <h3 className="text-[#FFFFFF99] text-sm sm:text-base">МОДУЛЬ {number}</h3>
                </div>
            </div>
        );
    }
}
