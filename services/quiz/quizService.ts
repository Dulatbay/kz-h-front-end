import baseApi, {handleApiRequest} from "@/services/baseApi";
import {
    PaginatedResponse,
    QuizByIdResponse,
    QuizCardResponse,
    Tag
} from "@/services/quiz/types";


export const fetchQuizById = async (quizId: string): Promise<QuizByIdResponse> => {
    return handleApiRequest(() => baseApi.get<QuizByIdResponse>(`/quizzes/${quizId}`).then((res) => res.data));
};


export const fetchQuizzes = async ({page, size, searchText, tags}: {
    page: number,
    size: number,
    searchText?: string,
    tags: Tag[]
}) => {
    let url = `/quizzes?page=${page}&size=${size}&searchText=${searchText}`;
    tags.forEach((tag) => {
        url += `&${tag.type}=${tag.query_value}`;
    });

    return handleApiRequest(() =>
        baseApi.get<PaginatedResponse<QuizCardResponse>>(url).then((res) => res.data)
    );
};

