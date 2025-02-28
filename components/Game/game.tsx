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
import { useTranslation } from "react-i18next";


export default function Game() {
    const router = useRouter();
    const gameId = useParams().game as string;
    const {t} = useTranslation();

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
                <a href="/quizzes"
                   className="text-center border-gray-400 text-gray-400 border py-1 px-6 rounded-md self-center">←
                    {t('game.back')}</a>
                {
                    gameData.finished ?
                        <a className="bg-[#5348F2] px-14 py-2 rounded-md content-center cursor-pointer"
                           href={`/quizzes/${gameData.quizId}`}>
                            {t('game.tryAgain')}
                        </a> :
                        <a className="bg-[#3DBA60] px-14 rounded-sm content-center cursor-pointer"
                           href={`/games/${gameId}/play`}>{t('game.continue')}</a>
                }
                {/* <a className="bg-[#5348F2] px-6 rounded-sm content-center cursor-pointer" href={'/quizzes'}>
                    Select other
                </a> */}

                <a href="/quizzes"
                   className="invisible text-center border-gray-400 text-gray-400 border py-1 px-6 rounded-md self-center">←
                    {t('game.back')}</a>
            </div>
            <div className="flex flex-col gap-6 mt-4">
                <div>
                    <span className={'block text-center text-gray-400'}>{t('game.quizResults')}</span>
                    <h1 className="text-center text-xl">{gameData.quizName}</h1>
                </div>
                <div className="flex flex-col items-center">
                <div className="flex items-center space-x-2 text-xl font-bold">
                        <span className="text-green-500">{gameData.correctAnswersCount}</span>
                        <span className="text-gray-400">/</span>
                        <span className="text-gray-300">{gameData.questionCount}</span>
                    </div>
                    <div className="w-full max-w-xs mt-2">
                        <div className="w-full h-2 bg-red-800 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-green-500"
                                style={{width: `${(gameData.correctAnswersCount / gameData.questionCount) * 100}%`}}
                            ></div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between gap-4 flex-wrap">
                    <ResultCard result={gameData.duration > 60 ? `${formatDuration(intervalToDuration({
                        start: 0,
                        end: gameData.duration * 1000
                    }), {
                        format: ["hours", "minutes", "seconds",],
                        locale: i18n.language == 'en' ? enUS : (i18n.language == 'ru' ? ru : kk)
                    })}` : `${gameData.duration} sec`}
                                title="Duration"/>

                    <ResultCard result={`${gameData.result}%`} title="Result"/>
                    <ResultCard result={`${gameData.record}%`} title="Record"
                                additionalText={gameData.currentUserResult ? t('game.newRecord') : undefined}/>
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

function Icon({title}: { title: string }) {
    switch (title) {
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

function ResultCard({result, title, additionalText}: { result: string, title: string, additionalText?: string }) {
    return (
        <div className={"w-1/4 min-w-40 flex-1"}>
            <div
                className="flex border border-gray-400 bg-[#282828] gap-2 py-1 px-2 rounded-md items-center">
                <Icon title={title}/>
                <div className="flex flex-col">
                    <h1 className="font-bold text-sm line-clamp-1">{result}</h1>
                    <h3 className="text-[#FFFFFF75]">{title}</h3>
                </div>
            </div>
            {
            additionalText &&
                <p className="text-[#FFFFFF75] text-sm mt-1 text-right text-yellow-400">{additionalText}</p>
            }
        </div>
    )
}

const QuestionItem = ({question}: { question: AnsweredQuestionResponse }) => {

    const {t} = useTranslation();

    return (
        <div className={`border border-gray-400 bg-[#282828] pb-4 pt-8 w-full text-center px-8 rounded-md`}>
            <h1>{question.question}</h1>
            <div className="mt-4 flex gap-4 pb-3 justify-evenly flex-wrap flex-col">
                {question.variants.map((option, index) => {
                    let buttonStyle;

                    if (option.chosen && !option.correct) {
                        buttonStyle = 'border-red-700';
                    } else if (option.correct && option.chosen) {
                        buttonStyle = 'bg-green-800 border-green-400';
                    } else if (option.correct) {
                        buttonStyle = 'border-green-400';
                    } else {
                        buttonStyle = 'bg-[#2C2C2C] border-gray-500';
                    }

                    return (
                        <div className={"w-full"}>
                            <div
                                key={`option-${index}-${option.text}`}
                                className={`${buttonStyle} mt-2 text-center py-1 px-6 border flex-col rounded-md`}
                            >
                                {option.text}
                            </div>
                            {option.chosen && !option.correct && (
                                <div className={"text-right w-full text-sm text-blue-400"}>{t('game.chosen')}</div>)}
                            {option.correct && (
                                <div className={"text-right w-full text-sm text-green-400"}>{t('game.correct')}</div>)}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};