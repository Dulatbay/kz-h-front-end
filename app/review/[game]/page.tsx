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
            
        ]
    });
    
    // useEffect(() => {
    //     fetch(`${process.env.API_URL}/solo-game/${gameId}`).then((response) => {return response.json();} ).then((data) => { console.log(data); setResultsData(data); });

    // }, [gameId]);

    return (
        <div className="flex flex-col w-11/12 max-w-[1150px] mx-auto mt-6 gap-4">
            <div className="flex justify-between w-full h-auto text-md flex-wrap gap-4">
                <a href="/quizzes" className="text-center border-gray-400 text-gray-400 border py-1 px-6 rounded-md">← Back</a>
                <a className="bg-[#5348F2] px-14 rounded-sm content-center">Try again</a>
                <a className="bg-green-400 px-6 rounded-sm content-center">Select other</a>
            </div>
            <div className="flex flex-col gap-6 mt-4    ">
                <h1 className="">{resultsData.quizName}</h1>
                
                {/* <h2>{resultsData.beats}</h2>
                <h2>{resultsData.record}</h2> */}

                <div className="flex justify-between gap-4 flex-wrap">
                    <ResultCard result={`${Math.floor(resultsData.duration / 60)} min ${resultsData.duration % 60} sec`} title="Duration"/>
                    <ResultCard result={`${resultsData.result}%`} title="Result"/>
                    <ResultCard result={`${resultsData.beats}%`} title="Beats"/>
                    <ResultCard result={`${resultsData.record}%`} title="Record"/>
                </div>

                <div className="flex flex-col gap-4 mt-6">
                    {
                        resultsData.answeredQuestions.map((question, index) => (
                            <QuestionItem key={`q${index}`} question={question}/>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

function FireSVG(){
    return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_451_145)">
            <path d="M22.6031 14.3302C20.7814 9.59602 14.2951 9.34075 15.8616 2.45994C15.9776 1.9494 15.4323 1.55488 14.9913 1.82176C10.7793 4.30488 7.75082 9.28273 10.292 15.8038C10.5008 16.3376 9.87424 16.8365 9.4217 16.4884C7.32149 14.8988 7.10103 12.6129 7.28668 10.9768C7.3563 10.3734 6.56727 10.0834 6.23078 10.5823C5.44175 11.7891 4.64111 13.7384 4.64111 16.6741C5.08204 23.172 10.5704 25.1677 12.543 25.423C15.3626 25.7827 18.4143 25.2606 20.6074 23.2532C23.0209 21.0137 23.9027 17.4399 22.6031 14.3302ZM11.8352 20.1667C13.5061 19.7606 14.3647 18.5538 14.5968 17.4863C14.9797 15.827 13.4829 14.2026 14.4924 11.5802C14.8753 13.75 18.2867 15.1076 18.2867 17.4747C18.3795 20.4104 15.2002 22.9283 11.8352 20.1667Z" fill="#FFEC2D"/>
            </g>
            <defs>
            <clipPath id="clip0_451_145">
            <rect width="27.8481" height="27.8481" fill="white"/>
            </clipPath>
            </defs>
        </svg>
    )
}

function ResultCard({result, title}: {result: string, title: string}){
    return (
        <div className="flex border border-gray-400 bg-[#282828] gap-1 py-1 px-2 w-1/5 min-w-40 rounded-md">
            <FireSVG/>
            <div className="flex flex-col">
                <h1><strong>{result}</strong></h1>
                <h3 className="text-[#FFFFFF75]">{title}</h3>
            </div>
        </div>
    )
}

class Variant {
    "answer": string;
    "correct": boolean;
    "chosen": boolean;
}

class Question {
    "question": string;
    "questionId": string;
    "variants": Variant[];
}

const QuestionItem = ({ question } : {question : Question}) => {
    const isCorrectAnswer = question.variants.some(q => q.chosen && q.correct);
  
    if (isCorrectAnswer) {
      return (
          <div className="border border-green-400 bg-[#282828] py-3 w-full text-center">
            {question.question}
          </div>
      );
    }
  
    return (
        <div className="border border-red-500 bg-[#282828] py-3 w-full text-center">
          <h1>{question.question}</h1>
          <div className="flex gap-4 pb-3 justify-evenly flex-wrap">
            {question.variants.map((option, index) => {
              let answerColor = 'bg-red-500';
              
              if (option.chosen) {
                answerColor = 'bg-[#5348F299]';
              }
              
              if (option.correct) {
                answerColor = 'bg-green-400';
              }
  
              return (
                <div 
                  key={`option-${index}-${option.answer}`}
                  className={`${answerColor} mt-2 text-center py-1 px-6`}
                >
                  {option.answer}
                </div>
              );
            })}
          </div>
        </div>
    );
};