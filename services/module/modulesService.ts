import {LastTopicResponse, ModuleResponse} from "@/services/module/types";
import baseAxios from "@/services/baseAxios";


export const fetchModules = async (language: string = 'RU'): Promise<ModuleResponse[]> => {
    const response = await baseAxios.get<ModuleResponse[]>(`${process.env.API_URL}/modules`, {
        headers: {
            'Accept-Language': language,
        },
    });
    return response.data;
};


export const fetchModuleByNumber = async (number: string, language: string = 'RU') => {
    const response = await baseAxios.get(`${process.env.API_URL}/modules/${number}`, {
        headers: {
            'Accept-Language': language,
        },
    });
    return response.data;
};

export const fetchTopicByParams = async (moduleNumber: string, topicNumber: string, language: string = 'RU') => {
    const response = await baseAxios.get(
        `/modules/initializer-test/${moduleNumber}/topics/${topicNumber}`, {
            headers: {
                'Accept-Language': language,
            },
        }
    );

    return response.data
}

export const fetchLastTopic = async (language: string = 'RU'): Promise<LastTopicResponse> => {
    const response = await baseAxios.get<LastTopicResponse>(
        `/modules/me/last`, {
            headers: {
                'Accept-Language': language,
            },
        }
    );

    return response.data
}
