import baseApi, {handleApiRequest} from "@/services/baseApi";
import {FetchQuestionsRequest, QuestionCard} from "@/services/question/types";
import {PaginatedResponse} from "@/services/baseTypes";

export const fetchQuestions = async (page: number, size: number, request: FetchQuestionsRequest): Promise<PaginatedResponse<QuestionCard>> => {
    return handleApiRequest(() =>
        baseApi.post<PaginatedResponse<QuestionCard>>(`/questions/view?page=${page}&size=${size}`, request)
            .then((response) => response.data)
    );
};