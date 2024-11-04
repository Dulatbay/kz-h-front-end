import Image from "next/image"

export default function Quiz(){
    const question = {
        'text': 'В каком году возродилось казахское ханство?',
        'img': '',
        'options': ['1465', '1464', '1463', '1462'],
    }
    const colors = ['bg-red-500', 'bg-indigo-500', 'bg-green-500', 'bg-pink-500']
    return (
        <div className="flex flex-col w-11/12 max-w-[800px] mx-auto items-center mt-16 gap-10">
            <div className="flex flex-col gap-2 items-center">
                <h3 className="text-sm text-[#91898C]">1/36 Вопрос</h3>
                <h1 className="text-base">{question.text}</h1>
            </div>
            <img className="bg-red-600 w-full aspect-video"  alt="illustration"/>
            <div className="flex w-full flex-wrap">
                {
                    question.options.map((option, index) => {
                        
                        return (
                            <button key={`button-${index}`} className={`w-full sm:w-1/2 h-24 ${colors[index]}`}>{option}</button>
                        )
                    })
                }
            </div>
        </div>
    )
}