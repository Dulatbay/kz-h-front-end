'use client'


import Collapse from '@/components/Collapse/collapse';
import {useParams, useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';
import {fetchQuizById} from "@/services/quiz/quizService";
import {QuizByIdResponse} from "@/services/quiz/types";
import {HttpException} from "@/utills/exceptions";
import Loader from "@/components/Loader/loader";

export default function PreviewQuiz() {
    const router = useRouter();
    const quizId = useParams().quiz as string;
    const [quizData, setQuizData] = useState<QuizByIdResponse | undefined>();
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                setLoading(true);
                const data = await fetchQuizById(quizId);
                setQuizData(data);
            } catch (error) {
                if (error instanceof HttpException) {
                    router.push(`/error?status=${error.status}&message=${error.message}`);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchQuestion();
    }, [quizId]);


    if (loading)
        return <div className={'mt-32'}><Loader/></div>

    return (
        <div className="flex w-full max-w-[1200px] mx-auto mt-10 gap-6 flex-wrap px-8">
            <div className="flex flex-col sm:w-1/2 gap-2">
                <h1 className="text-xl">{quizData?.title}</h1>
                <p className="text-sm text-[#91898C]">{quizData?.description}</p>
                {
                    quizData?.inProgress ?
                        <>
                            <button type="button" onClick={() => router.push(`/games/${quizData?.gameId}`)}
                                    className="uppercase bg-yellow-600 w-full h-12 my-6 text-center content-center rounded">
                                View game
                            </button>
                        </> :
                        <button type="button" onClick={() => router.push(`/quizzes/${quizId}/start`)}
                                className="uppercase bg-[#5348F2] w-full h-12 my-6 text-center content-center disabled:opacity-50 rounded disabled:cursor-not-allowed"
                                disabled={!(quizData?.questions?.length)}
                        >
                            Start
                        </button>
                }

                {/*<Collapse id="openOptions" name="Available options" className="w-full rounded">*/}
                {/*    <div>*/}

                {/*    </div>*/}
                {/*</Collapse>*/}
            </div>

            <div className="flex-1">
                <Collapse name="Вопросы" className="w-full max-h-[calc(100vh-180px)] rounded" id="openAnswers"
                          defaultOpen>
                    {(quizData && quizData.questions && quizData.questions.length) ?
                        quizData.questions.map((question: string, index: number) => {
                            return (
                                <div key={`question${index}`}
                                     className="flex flex-col border border-white rounded-md p-3">
                                    <h2>{question}</h2>
                                </div>
                            )
                        })
                        : <></>
                    }
                </Collapse>
            </div>
        </div>
    )
}