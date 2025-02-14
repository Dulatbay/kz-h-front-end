import baseApi, {handleApiRequest} from "@/services/baseApi";
import {AuthResponse, SessionsResponse, UserResponse} from "@/services/auth/types";

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

export async function logout() {
    return handleApiRequest(() =>
        baseApi.post<void>(`/auth/logout`)
    );
}

export async function register({email, username, password, confirmPassword}: { email: string, username: string, password: string, confirmPassword: string }) {
    return handleApiRequest(() =>
        baseApi.post<void>(`/auth/register`, {
            email, username, password, confirm_password: confirmPassword
        })
    );
}

export async function getSessions(){
    return handleApiRequest(() => 
        baseApi.get<SessionsResponse>(`/auth/devices`).then((res) => res.data)
    );
}

export async function terminateSession(tokenId: string){
    return handleApiRequest(() =>
        baseApi.delete<void>(`/auth/devices/${tokenId}`)
    );
}

export const editPassword = async (oldPassword: string, newPassword: string) => {
    return handleApiRequest(() => baseApi
        .patch<UserResponse>("/auth/change-password", {
            oldPassword, newPassword
        })).then(res => res.data);
}