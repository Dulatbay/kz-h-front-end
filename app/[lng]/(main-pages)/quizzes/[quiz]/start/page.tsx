'use client'

import Timer from "@/components/Timer/timer";
import {useParams, useRouter} from "next/navigation";
import {useState} from "react";
import Loader from "@/components/Loader/loader";
import {startGame} from "@/services/game/gameService";
import {HttpException} from "@/utills/exceptions";


export default function Start() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();
    const quizId = useParams().quiz as string;

    const handleComplete = () => {
        setIsLoading(true);
        startGame(quizId)
            .then(res => {
                console.log("res", res);
                router.push(`/games/${res.gameId}`);
            })
            .catch((error) => {
                console.error("Something went wrong", error);
                if (error instanceof HttpException) {
                    router.push(`/error?status=${error.status}&message=${error.message}`);
                }
            })
    };

    if (isLoading) {
        return <div className={'mt-64'}>
            <Loader/>
        </div>
    }

    return <div className={'mt-64'}>
        <Timer seconds={3} onComplete={handleComplete}/>
    </div>;
}
