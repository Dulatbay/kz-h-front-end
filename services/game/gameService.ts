import baseApi, {handleApiRequest} from "@/services/baseApi";
import {GameByIdResponse, ProcessGameResponse} from "@/services/game/types";

export const sendAnswerByGameId = async (gameId: string, answers: string[]): Promise<ProcessGameResponse> => {
    return handleApiRequest(() =>
        baseApi.post<ProcessGameResponse>(
            `/solo-game/next-question/${gameId}`,
            answers
        ).then((res) => res.data)
    );
};


export const startGame = async (quizId: string): Promise<ProcessGameResponse> => {
    return handleApiRequest(() => baseApi.post<ProcessGameResponse>(
        `/solo-game/start/${quizId}`
    ).then((res) => res.data));
};

export const fetchGameById = async (gameId: string): Promise<GameByIdResponse> => {
    return handleApiRequest(() =>
        baseApi.get<GameByIdResponse>(`/solo-game/${gameId}`).then((res) => res.data)
    );
};

export const fetchProcessGameById = async (gameId: string): Promise<ProcessGameResponse> => {
    return handleApiRequest(() =>
        baseApi.get<ProcessGameResponse>(`/solo-game/current-process/${gameId}`).then((res) => res.data)
    );
};