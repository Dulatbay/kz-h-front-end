import baseApi, {handleApiRequest} from "@/services/baseApi";
import {AnswerRequest, FetchQuestionsRequest, Mistake, Question, QuestionCard, Result} from "@/services/question/types";
import {PaginatedResponse} from "@/services/baseTypes";

export const fetchQuestionsPaginated = async (page: number, size: number, request: FetchQuestionsRequest): Promise<PaginatedResponse<QuestionCard>> => {
    return handleApiRequest(() =>
        baseApi.post<PaginatedResponse<QuestionCard>>(`/questions/view?page=${page}&size=${size}`, request)
            .then((response) => response.data)
    );
};

export const fetchQuestions = async (request: FetchQuestionsRequest): Promise<Question[]> => {
    return handleApiRequest(() =>
        baseApi.post(`/questions?limit=10`, request)
            .then((response) => response.data)
    );
}

export const sendAnswer = async (questionId: string, request: AnswerRequest): Promise<Result[]> => {
    return handleApiRequest(() =>
        baseApi.post(`/questions/${questionId}/answer`, request)
            .then((response) => response.data)
    );
}

export const fetchMistakes = async (): Promise<Mistake[]> => {
    return handleApiRequest(() =>
        baseApi.get(`/questions/mistakes?limit=10`)
            .then((response) => response.data)
    );
}