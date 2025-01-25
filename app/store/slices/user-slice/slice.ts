import {createSlice} from "@reduxjs/toolkit";
import {UserResponse} from "@/services/auth/types";

interface UserState {
    user: UserResponse | null;
    lastFetched: number | null; // Дата последнего запроса в формате ISO
}

const initialState: UserState = {
    user: null,
    lastFetched: null,
};

export const userOptions = createSlice({
    name: 'userOptions',
    initialState,
    reducers: {
        setCurrentUser: (state, action) => {
            state.user = action.payload;
            state.lastFetched = Date.now();
        }
    }
})


export const {
    setCurrentUser
} = userOptions.actions
export default userOptions.reducer