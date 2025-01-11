'use client'

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react"

export default function Quiz({
    params,
  }: {
    params: Promise<{ quiz: string }>
  }){
    const quizId = useParams().quiz;
    const router = useRouter();
    const [questionData, setQuestionData] = useState({ gameId: '', totalQuestions: 0, currentQuestionIndex: 0, 
        currentQuestion: {
            "quizQuestionId": "",
            "question": "",
            "questionIdx": 0,
            "duration": 0,
            "variants": [
                "",
                ""
        ]} }); 
    useEffect(() => {
        const fetchQuizQuestion = async () => { 
            try { 
                const response = await fetch(`${process.env.API_URL}/solo-game/start/${quizId}`, 
                    {
                        method: "POST",
                        headers: {
                            "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IlVTRVIiLCJlbWFpbCI6InRlc3R1c2VyQGdtYWlsLmNvbSIsInN1YiI6InRlc3R1c2VyIiwiaWF0IjoxNzM2NTkyMzQxLCJleHAiOjE3MzY2Nzg3NDF9.z7rbW-pY2_PdXplFTvnnpth1W5O1JmH_sASRF5cztek"
                        }
                    }); 
                const data = await response.json();
                console.log(data);
                setQuestionData(data);
            } catch (error) { 
                console.error('Error fetching quiz data:', error); 
            }
        };
        
        fetchQuizQuestion();
    }, [quizId])


    const sendAnswer = async (answer : string) => {
        
        try { 
            const response = await fetch(`${process.env.API_URL}/solo-game/next-question/${questionData.gameId}`, 
                {
                    method: "POST",
                    headers: {
                        "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IlVTRVIiLCJlbWFpbCI6InRlc3R1c2VyQGdtYWlsLmNvbSIsInN1YiI6InRlc3R1c2VyIiwiaWF0IjoxNzM2NTkyMzQxLCJleHAiOjE3MzY2Nzg3NDF9.z7rbW-pY2_PdXplFTvnnpth1W5O1JmH_sASRF5cztek",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify([answer])
                }); 
            const data = await response.json();
            console.log(data);
            if(questionData.currentQuestionIndex + 1 == questionData.totalQuestions){
                router.push(`/review/${questionData.gameId}`);
                return;
            }else{
                setQuestionData(data);
            }
        } catch (error) { 
            console.error('Error fetching quiz data:', error); 
        }
    };

    const colors = ['bg-red-500', 'bg-indigo-500', 'bg-green-500', 'bg-pink-500']
    return (
        <div className="flex flex-col w-11/12 max-w-[800px] mx-auto items-center mt-16 gap-10">
            <div className="flex flex-col gap-2 items-center">
                <h3 className="text-sm text-[#91898C]">{questionData.currentQuestionIndex + 1}/{questionData.totalQuestions} Вопрос</h3>
                <h1 className="text-base">{questionData.currentQuestion.question}</h1>
            </div>
            <img className="bg-red-600 w-full aspect-video"  alt="illustration"/>
            <div className="flex w-full flex-wrap">
                {
                    questionData.currentQuestion.variants.map((option, index) => {
                        
                        return (
                            <a key={`button-${index}`} className={`w-full sm:w-1/2 h-24 ${colors[index]} text-center content-center`} onClick={() => sendAnswer(option)}>{option}</a>
                        )
                    })
                }
            </div>
        </div>
    )
}