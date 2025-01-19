import axios from "axios";

export async function login(emailOrUsername: string, password: string) {
    try {
        const response = await axios.post(`${process.env.API_URL}/auth/login`, {
            emailOrUsername,
            password,
        });
        return response.data;
    } catch (error: any) {
        if (error.response) {
            throw new Error(error.response.data.message || 'Ошибка авторизации');
        }
        throw new Error('Сервер недоступен');
    }
}