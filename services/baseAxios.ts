import axios from 'axios';


const baseAxios = axios.create({
    baseURL: process.env.API_URL,
    headers: {
        "Accept-Language": 'KAZ'
    }
});

baseAxios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
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

baseAxios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        console.log(error.response && error.response.status === 401 && !originalRequest._retry, isRefreshing);

        // Если ошибка - токен истек (401), пытаемся обновить токен
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                // Ожидаем завершения обновления токена
                return new Promise<string>((resolve, reject) => {
                    failedQueue.push({resolve, reject});
                })
                    .then((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return baseAxios(originalRequest);
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

                // Отправляем запрос на обновление токена
                const response = await axios.post<{ token: string }>(
                    `${process.env.API_URL}/refresh-token`,
                    {refreshToken}
                );

                const newToken = response.data.token;

                // Сохраняем новый токен
                localStorage.setItem('token', newToken);

                processQueue(null, newToken);

                // Добавляем новый токен в заголовки и повторяем запрос
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return baseAxios(originalRequest);
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


export default baseAxios;
