import baseApi, {handleApiRequest} from "@/services/baseApi";
import {
    QuizByIdResponse,
    QuizCardResponse,
    Tag
} from "@/services/quiz/types";
import {PaginatedResponse} from "@/services/baseTypes";
import {Question} from "@/app/[lng]/(main-pages)/quizzes/create/page";
import i18n from "@/i18n/i18n";


export const fetchQuizById = async (quizId: string): Promise<QuizByIdResponse> => {
    return handleApiRequest(() => baseApi.get<QuizByIdResponse>(`/quizzes/${quizId}`).then((res) => res.data));
};

export const createQuiz = async (
    title: string,
    description: string,
    showQuestions: boolean,
    language: string,
    questions: Question[]
) => {
    const questionCreateRequests = questions.map((q) => {
        if (q.type === "CREATE") {
            return {
                questionCreate: {
                    question: q.question,
                    topicId: q.topicIds,
                    level: q.level,
                    durationInSeconds: q.durationInSeconds,
                    variants: q.variants,
                },
            };
        } else {
            return {
                questionGenerate: {
                    questionId: "",
                },
            };
        }
    });

    return handleApiRequest(() =>
        baseApi
            .post<void>("/quizzes", {
                title,
                description,
                showQuestions,
                language,
                questionCreateRequests,
            })
            .then((res) => res.data)
    );
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

