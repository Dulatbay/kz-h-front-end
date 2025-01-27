import {ApiErrorResponse, LastTopicResponse, ModuleResponse, TopicDetailResponse} from "@/services/module/types";
import baseApi, {handleApiRequest} from "@/services/baseApi";

export const fetchModules = async (): Promise<ModuleResponse[]> => {
    return handleApiRequest(() =>
        baseApi.get<ModuleResponse[]>(`/modules`).then((response) => response.data)
    );
};

export const fetchModuleByNumber = async (number: string, language: string = "RU") => {
    return handleApiRequest(() =>
        baseApi
            .get(`/modules/${number}`, {
                headers: {
                    "Accept-Language": language,
                },
            })
            .then((response) => response.data)
    );
};

export const fetchTopicByParams = async (
    moduleNumber: string,
    topicNumber: string,
    language: string = "RU"
) => {
    return handleApiRequest(() =>
        baseApi
            .get<TopicDetailResponse>(`/modules/initializer-test/${moduleNumber}/topics/${topicNumber}`, {
                headers: {
                    "Accept-Language": language,
                },
            })
            .then((response) => response.data)
    );
};

export const fetchLastTopic = async (language: string = "RU"): Promise<LastTopicResponse> => {
    return handleApiRequest(() =>
        baseApi
            .get<LastTopicResponse>(`/modules/me/last`, {
                headers: {
                    "Accept-Language": language,
                },
            })
            .then((response) => response.data)
    );
};

export const postPassedTopic = async (
    moduleNumber: string,
    topicNumber: string,
    language: string = "RU",
    
): Promise<ApiErrorResponse | null> => {
    return handleApiRequest(() =>
        baseApi
            .post(`/modules/${moduleNumber}/pass/${topicNumber}`, {
                headers: {
                    "Accept-Language": language,
                },
            })
            .then((response) => {
                if(response.status === 201){
                    return null;
                }
                return response.data;
            }).catch((error) => {
                if (error.response && error.response.data) {
                    return error.response.data as ApiErrorResponse;
                }
                throw error;
            })
    );
};
