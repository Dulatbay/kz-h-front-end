import {LastTopicResponse, ModuleResponse, TopicDetailResponse} from "@/services/module/types";
import baseApi, {handleApiRequest, ErrorResponse} from "@/services/baseApi";

export const fetchModules = async (): Promise<ModuleResponse[]> => {
    return handleApiRequest(() =>
        baseApi.get<ModuleResponse[]>(`/modules`).then((response) => response.data)
    );
};

export const fetchModuleByNumber = async (number: string) => {
    return handleApiRequest(() =>
        baseApi
            .get(`/modules/${number}`)
            .then((response) => response.data)
    );
};

export const fetchTopicByParams = async (
    moduleNumber: string,
    topicNumber: string
) => {
    return handleApiRequest(() =>
        baseApi
            .get<TopicDetailResponse>(`/modules/initializer-test/${moduleNumber}/topics/${topicNumber}`)
            .then((response) => response.data)
    );
};

export const fetchLastTopic = async (): Promise<LastTopicResponse> => {
    return handleApiRequest(() =>
        baseApi
            .get<LastTopicResponse>(`/modules/me/last`)
            .then((response) => response.data)
    );
};

export const postPassedTopic = async (
    moduleNumber: string,
    topicNumber: string,
): Promise<ErrorResponse | null> => {
    return handleApiRequest(() =>
        baseApi
            .post(`/modules/${moduleNumber}/pass/${topicNumber}`)
            .then((response) => response.data)
    );
};
