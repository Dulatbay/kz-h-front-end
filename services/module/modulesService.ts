import { LastTopicResponse, ModuleResponse } from "@/services/module/types";
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
            .get(`/modules/initializer-test/${moduleNumber}/topics/${topicNumber}`, {
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
