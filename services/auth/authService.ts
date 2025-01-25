import baseApi, {handleApiRequest} from "@/services/baseApi";
import {AuthResponse, UserResponse} from "@/services/auth/types";

export async function login(emailOrUsername: string, password: string) {
    return handleApiRequest(() =>
        baseApi.post<AuthResponse>(`/auth/login`, {
            emailOrUsername,
            password,
        }).then((res) => res.data)
    );
}

export async function getMe() {
    return handleApiRequest(() =>
        baseApi.get<UserResponse>(`/auth/me`).then((res) => res.data)
    );
}

