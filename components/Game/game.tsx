'use client'

import {useParams, useRouter} from "next/navigation";
import {HttpException} from "@/utills/exceptions";
import Loader from "@/components/Loader/loader";
import {useEffect, useState} from "react";
import FireSVG from "@/components/icons/FireSVG";
import {formatDuration, intervalToDuration} from 'date-fns';
import {ru, enUS, kk} from 'date-fns/locale';
import i18n from "@/i18n/i18n";
import {AnsweredQuestionResponse, GameByIdResponse} from "@/services/game/types";
import {fetchGameById} from "@/services/game/gameService";
import ClockSVG from "../icons/ClockSVG";
import TargetSVG from "../icons/TargetSVG";
import TrophySVG from "../icons/TrophySVG";


export default function Game() {
    const router = useRouter();
    const gameId = useParams().game as string;

    const [gameData, setGameData] = useState<GameByIdResponse | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchGameById(gameId as string)
            .then((data) => {
                setGameData(data);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                if (err instanceof HttpException) {
                    router.push(`/error?status=${err.status}&message=${err.message}`);
                }
            });
    }, [gameId]);

    if (loading || !gameData) {
        return <Loader/>
    }


    return (
        <div className="flex flex-col w-11/12 max-w-[1150px] mx-auto mt-6 gap-4">
            <div className="flex justify-between w-full h-auto text-md flex-wrap gap-4">
                <a href="/quizzes" className="text-center border-gray-400 text-gray-400 border py-1 px-6 rounded-md self-center">←
                    Back</a>
                {
                    gameData.finished ?
                        <a className="bg-[#5348F2] px-14 rounded-sm content-center cursor-pointer"
                           href={`/quizzes/${gameData.quizId}`}>
                            Try again
                        </a> :
                        <a className="bg-[#3DBA60] px-14 rounded-sm content-center cursor-pointer"
                           href={`/games/${gameId}/play`}>Continue</a>
                }
                {/* <a className="bg-[#5348F2] px-6 rounded-sm content-center cursor-pointer" href={'/quizzes'}>
                    Select other
                </a> */}

                <a href="/quizzes" className="invisible text-center border-gray-400 text-gray-400 border py-1 px-6 rounded-md self-center">←
                Back</a>
            </div>
            <div className="flex flex-col gap-6 mt-4    ">
                <h1 className="">{gameData.quizName}</h1>

                {/* <h2>{resultsData.beats}</h2>
                <h2>{resultsData.record}</h2> */}

                <div className="flex justify-between gap-4 flex-wrap">
                    <ResultCard result={`${gameData.beats}%`} title="Beats"/>
                    <ResultCard result={gameData.duration > 60 ? `${formatDuration(intervalToDuration({
                        start: 0,
                        end: gameData.duration * 1000
                    }), {
                        format: ["hours", "minutes", "seconds",],
                        locale: i18n.language == 'en' ? enUS : (i18n.language == 'ru' ? ru : kk)
                    })}` : `${gameData.duration} sec`}
                                title="Duration"/>
                    <ResultCard result={`${gameData.result}%`} title="Result"/>
                    <ResultCard result={`${gameData.record}%`} title="Record"/>
                </div>

                <div className="flex flex-col gap-4 mt-6">
                    {
                        gameData.answeredQuestions.map((question, index) => (
                            <QuestionItem key={`q${index}`} question={question}/>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

function Icon({title} : {title: string}){
    switch (title){
        case "Duration":
            return (<ClockSVG/>);
        case "Beats":
            return (<FireSVG/>);
        case "Result":
            return (<TargetSVG/>);
        default:
            return (<TrophySVG/>);
    }
}

function ResultCard({result, title}: { result: string, title: string }) {
    return (
        <div className="flex border border-gray-400 bg-[#282828] gap-2 py-1 px-2 w-1/5 min-w-40 rounded-md items-center">
            <Icon title={title}/>
            <div className="flex flex-col">
                <h1 className="font-bold text-sm">{result}</h1>
                <h3 className="text-[#FFFFFF75]">{title}</h3>
            </div>
        </div>
    )
}

const QuestionItem = ({question}: { question: AnsweredQuestionResponse }) => {
    const isCorrectAnswer = question.variants.some(q => q.chosen && q.correct);

    if (isCorrectAnswer) {
        return (
            <div className="border border-green-600 bg-[#282828] p-3 w-full text-center">
                {question.question}
            </div>
        );
    }

    return (
        <div className="border border-red-500 bg-[#282828] py-3 w-full text-center px-8">
            <h1>{question.question}</h1>
            <div className="mt-4 flex gap-4 pb-3 justify-evenly flex-wrap flex-col">
                {question.variants.map((option, index) => {
                    let buttonStyle;

                    if (option.chosen) {
                        buttonStyle = 'bg-[#372bdb] border-[#5348F2]';
                    }else if (option.correct) {
                        buttonStyle = 'bg-green-600 border-green-700';
                    }else{
                        buttonStyle = 'bg-rose-900 border-rose-700';
                    }

                    return (
                        <div
                            key={`option-${index}-${option.text}`}
                            className={`${buttonStyle} mt-2 text-center py-1 px-6 border-4 flex-col`}
                        >
                            {option.text}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};