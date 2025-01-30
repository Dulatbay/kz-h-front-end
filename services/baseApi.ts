import axios from 'axios';
import i18n from "@/i18n/i18n";
import {HttpException} from "@/utills/exceptions";
import {ACCESS_TOKEN} from "@/utills/constants";

const baseApi = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}`
});

export interface ErrorResponse {
    error: string;
    message: string;
    timestamp: number;
    status: number;
}

baseApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        config.headers['Accept-Language'] = i18n.language;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

let isRefreshing = false;

type FailedRequest = {
    resolve: (token: string) => void;
    reject: (error: any) => void;
};

let failedQueue: FailedRequest[] = [];

const processQueue = (error: any, token: string | null) => {
    failedQueue.forEach((prom) => {
        if (token) {
            prom.resolve(token);
        } else {
            prom.reject(error);
        }
    });
    failedQueue = [];
};

baseApi.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                // Ожидаем завершения обновления токена
                return new Promise<string>((resolve, reject) => {
                    failedQueue.push({resolve, reject});
                })
                    .then((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return baseApi(originalRequest);
                    })
                    .catch((err) => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const refreshToken = localStorage.getItem('refreshToken');
                if (!refreshToken) {
                    throw new Error("No refresh token available");
                }

                const response = await baseApi.post<{ access_token: string }>(
                    `/auth/refresh-token`,
                    {refreshToken}
                );

                const newToken = response.data.access_token;

                localStorage.setItem(ACCESS_TOKEN, newToken);

                processQueue(null, newToken);

                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return baseApi(originalRequest);
            } catch (err) {
                processQueue(err, null);
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);


export const handleApiRequest = async <T>(apiCall: () => Promise<T>): Promise<T> => {
    try {
        return await apiCall();
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new HttpException({
                status: error.response?.status || 500,
                error: error.response?.data?.error || "Unknown Error",
                message: error.response?.data?.message || "An error occurred while processing the request.",
                timestamp: error.response?.data?.timestamp || Date.now(),
            } as ErrorResponse);
        }

        throw new HttpException({
            status: 500,
            error: "Unexpected Error",
            message: "An unexpected error occurred while processing the request.",
            timestamp: Date.now(),
        } as ErrorResponse);
    }
};


export default baseApi;
