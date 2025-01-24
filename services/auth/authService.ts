import axios from "axios";
import baseApi from "@/services/baseApi";

export async function login(emailOrUsername: string, password: string) {
    try {
        const response = await baseApi.post(`/auth/login`, {
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