// import {ModuleResponse} from "@/services/module/types";
import baseAxios from "@/services/baseAxios";
import { QuizResponse } from "./types";

export const fetchQuizById = async (quizId: string): Promise<QuizResponse> => {
    const response = await baseAxios.post<QuizResponse>(
        `/solo-game/start/${quizId}`
    );

    return response.data;
}

export const sendAnswerByGameId = async (gameId: string, answers: string[]): Promise<QuizResponse> => {
    const response = await baseAxios.post<QuizResponse>(
        `/solo-game/next-question/${gameId}`, {
            body: answers,
        }
    );

    return response.data;
}