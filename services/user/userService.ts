import baseApi, {handleApiRequest} from "@/services/baseApi";
import {UserResponse} from "@/services/auth/types";
import {LeadersResponse} from "@/services/user/types";

export const editFullName = async (firstName: string, lastName: string) => {
    return handleApiRequest(() => baseApi
        .patch<UserResponse>("/users/set-user-name", {
            firstName, lastName
        })).then(res => res.data);
}

export const fetchLeaderboard = async (page = 0, size = 20) => {
    return handleApiRequest(() => baseApi.get<LeadersResponse>(`/users/leaderboard`, {
        params: {page, size}
    }).then(res => res.data));
};

export const editUserImage = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    return handleApiRequest(() =>
        baseApi.patch<string>("/users/set-image-url", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
    ).then(res => res.data);
};

