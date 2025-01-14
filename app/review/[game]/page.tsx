'use client'

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Review({

    params,
  }: {
    params: Promise<{ game: string }>
  })
  
{
    const gameId = useParams().game;

    const [resultsData, setResultsData] = useState({
        "gameId": "",
        "quizId": "",
        "quizName": "",
        "duration": 0,
        "result": 0.0,
        "beats": 0.0,
        "record": 0.0,
        "answeredQuestions": [
            {
                "question": "",
                "questionId": "",
                "variants": [
                    {
                        "answer": "",
                        "correct": true,
                        "chosen": false
                    },
                ]
            },
        ]
    });
    
    useEffect(() => {
        fetch(`${process.env.API_URL}/solo-game/${gameId}`).then((response) => {return response.json();} ).then((data) => { console.log(data); setResultsData(data); });

    }, [gameId]);

    return (
        <div className="flex flex-col p-6 gap-1">
            <h1 className="text-3xl">Тема: <strong>{resultsData.quizName}</strong></h1>
            <h2 className="">Время прохождения: <strong> {resultsData.duration} с. </strong></h2>
            <h2 className="">Результат: <strong>{resultsData.result} / 100</strong></h2>
            {/* <h2>{resultsData.beats}</h2>
            <h2>{resultsData.record}</h2> */}

            <div className="flex flex-col p-4 gap-16 mt-6">
                {
                    resultsData.answeredQuestions.map((question, index) => (
                        <div key={index} className="">
                            <h2 className="text-xl">{question.question}</h2>
                            <ul className="pl-6 list-item">
                                {
                                    question.variants.map((option, index2) => {
                                        
                                        let answerColor = 'text-white';
                                        let font = 'font-normal';

                                        if(option.chosen){
                                            answerColor = 'text-red-500';
                                        }
                                        
                                        if(option.correct){
                                            answerColor = 'text-green-400';
                                            font = 'font-bold';
                                        }
                                       
                                       return (
                                            <li key={"option" + index2} className={`${answerColor} ${font} list-disc mt-2`}>{option.answer}</li>
                                       );
                                    })
                                }
                            </ul>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}