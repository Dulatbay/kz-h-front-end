'use client'

import {ProcessGameResponse} from "@/services/game/types";
import {fetchProcessGameById, sendAnswerByGameId} from "@/services/game/gameService";
import {useParams, useRouter} from "next/navigation";
import {HttpException} from "@/utills/exceptions";
import Loader from "@/components/Loader/loader";
import {useEffect, useRef, useState} from 'react';

const GamePlayPage = () => {
    const [game, setGame] = useState<ProcessGameResponse | null>(null);
    const gameId = useParams().game as string;
    const router = useRouter();
    const [loading, setIsLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [timeLeft, setTimeLeft] = useState<number | null>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const fetchGame = async () => {
            setIsLoading(true);
            try {
                const fetchedGame = await fetchProcessGameById(gameId);
                setGame(fetchedGame);

                if (!fetchedGame.currentQuestion) {
                    router.push(`/games/${gameId}`);
                }


                if (fetchedGame.currentQuestion.duration !== -1) {
                    setTimeLeft(fetchedGame.currentQuestion.duration);
                }
            } catch (error) {
                if (error instanceof HttpException) {
                    router.push(`/error?status=${error.status}&message=${error.message}`);
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchGame();
    }, [gameId]);

    useEffect(() => {
        if (timeLeft === null || timeLeft < 0) {
            clearInterval(timerRef.current as NodeJS.Timeout);
            return;
        }

        if (timeLeft === 0) {
            handleSubmitQuestion(null);
        } else {
            timerRef.current = setTimeout(() => setTimeLeft((prev) => (prev as number) - 1), 1000);
        }

        return () => clearTimeout(timerRef.current as NodeJS.Timeout);
    }, [timeLeft]);

    const handleSubmitQuestion = async (selectedOption: string | null) => {
        setSubmitting(true);
        try {
            const fetchedGame = await sendAnswerByGameId(gameId, selectedOption ? [selectedOption] : []);
            if (!fetchedGame.currentQuestion) {
                router.push(`/games/${gameId}`);
            }

            setGame(fetchedGame);
            if (fetchedGame.currentQuestion.duration !== -1) {
                setTimeLeft(fetchedGame.currentQuestion.duration);
            }
        } catch (error) {
            if (error instanceof HttpException) {
                router.push(`/error?status=${error.status}&message=${error.message}`);
            }
        } finally {
            setSubmitting(false);
        }
    };

    if (loading || (game != null && !game.currentQuestion)) {
        return <Loader/>;
    }

    if (game === null) {
        return <div>Cannot access the game</div>;
    }

    const colors = ['bg-red-500', 'bg-indigo-500', 'bg-green-500', 'bg-pink-500'];
    return (
        <div className="flex flex-col w-11/12 max-w-[800px] mx-auto items-center mt-16 gap-10">
            <div className="flex flex-col gap-2 items-center">
                <h3 className="text-sm text-[#91898C]">
                    {game.currentQuestionIndex + 1}/{game.totalQuestions} Вопрос
                </h3>
                <h1 className="text-base text-center">{game.currentQuestion.question}</h1>
                {timeLeft !== null && (
                    <h2 className="text-lg font-bold text-red-500">
                        Осталось времени: {timeLeft} сек
                    </h2>
                )}
            </div>
            <div className="flex w-full flex-wrap">
                {game.currentQuestion.variants.map((option, index) => (
                    <button
                        key={`button-${index}`}
                        disabled={submitting}
                        className={`w-full sm:w-1/2 h-24 ${colors[index]} text-center content-center`}
                        onClick={() => handleSubmitQuestion(option)}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default GamePlayPage;
