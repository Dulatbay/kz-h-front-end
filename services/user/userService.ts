import baseApi, {handleApiRequest} from "@/services/baseApi";
import {UserResponse} from "@/services/auth/types";

export const editFullName = async (firstName: string, lastName: string) => {
    return handleApiRequest(() => baseApi
        .patch<UserResponse>("/users/set-user-name", {
            firstName, lastName
        })).then(res => res.data);
}