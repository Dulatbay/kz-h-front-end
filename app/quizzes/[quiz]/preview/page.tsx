'use client'
import Collapse from '@/components/Collapse/collapse';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CreateQuiz(
    {
        params,
      }: {
        params: Promise<{ quiz: string }>
      }
){
    const router = useRouter();
    const [quizNumber, setQuizNumber] = useState("undef")
    useEffect(() => {
        async () => {
            setQuizNumber((await params).quiz)
        }
    })

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
                <button type="button" onClick={() => router.push(`/quizzes/${quizNumber}/start`)} className="uppercase bg-[#5348F2] w-full h-12 my-6 text-center content-center">Start</button>

                <Collapse id="openOptions" name="Available options" className="w-full">
                    <div>

                    </div>
                </Collapse>
            </div>

            <div className="flex-1">
                <Collapse name="Вопросы" className="w-full max-h-[calc(100vh-180px)]" id="openAnswers">
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