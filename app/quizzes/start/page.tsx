export default function CreateQuiz(){

    const questions = [
        {
            'text': 'В каком году возродилось Казахское ханство?',
            'options': ['1900', '1465', '1900', '1900'],
        },
        {
            'text': 'В каком году возродилось Казахское ханство?',
            'options': ['1900', '1465', '1900', '1900'],
        },
        {
            'text': 'В каком году возродилось Казахское ханство?',
            'options': ['1900', '1465', '1900', '1900'],
        },
        {
            'text': 'В каком году возродилось Казахское ханство?',
            'options': ['1900', '1465', '1900', '1900'],
        },
        {
            'text': 'В каком году возродилось Казахское ханство?',
            'options': ['1900', '1465', '1900', '1900'],
        },
        {
            'text': 'В каком году возродилось Казахское ханство?',
            'options': ['1900', '1465', '1900', '1900'],
        },
        {
            'text': 'В каком году возродилось Казахское ханство?',
            'options': ['1900', '1465', '1900', '1900'],
        },
        {
            'text': 'В каком году возродилось Казахское ханство?',
            'options': ['1900', '1465', '1900', '1900'],
        },
        {
            'text': 'В каком году возродилось Казахское ханство?',
            'options': ['1900', '1465', '1900', '1900'],
        },
        {
            'text': 'В каком году возродилось Казахское ханство?',
            'options': ['1900', '1465', '1900', '1900'],
        },
    ]

    return (
        <div className="flex w-full max-w-[1200px] mx-auto mt-10 gap-6 flex-wrap px-8">
            <div className="flex flex-col sm:w-1/2 gap-2">
                <h1 className="text-xl">Quiz Title</h1>
                <p className="text-sm text-[#91898C]">At Microsoft, you’ll take risks, push boundaries, and grow more than you thought possible. And you won’t be alone on that journey.</p>
                <a href="/quizzes/1" className="uppercase bg-[#5348F2] w-full h-12 my-6 text-center content-center">Start</a>

                <Collapse id="openOptions" name="Available options" className="w-full max-h-[calc(100vh-180px)]">
                    <div>

                    </div>
                </Collapse>
            </div>

            <div className="max-h-[calc(100vh-180px)] flex-1">
                <Collapse name="Вопросы" className="w-full" id="openAnswers">
                        {
                            questions.map((question, index) => {
                                return (
                                    <div key={`question${index}`} className="flex flex-col border border-white rounded-md p-3">
                                        <h2>{question.text}</h2>
                                        {
                                            question.options.map((text, ind) => {
                                                return (
                                                    <p key={`option${index}-${ind}`} className="flex items-center gap-1">
                                                        <i>
                                                            <svg width="8" height="8" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <circle cx="3" cy="3" r="3" fill="#D9D9D9"/>
                                                            </svg>
                                                        </i>
                                                        {text}
                                                    </p>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            })
                        }
                    
                </Collapse>
            </div>
        </div>
    )
}

function Collapse({className, name, children, id}:{className?: string, name:string, children: React.ReactNode, id: string}){
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
            <div className={`overflow-y-scroll flex-col gap-2 hidden peer-checked:flex`}>
                {children}
            </div>
        </div>
    )
}