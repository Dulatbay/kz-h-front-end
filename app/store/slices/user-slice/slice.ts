import {createSlice} from "@reduxjs/toolkit";
import {UserResponse} from "@/services/auth/types";

interface UserState {
    user: UserResponse | null;
    lastFetched: number | null;
}

const initialState: UserState = {
    user: null,
    lastFetched: null,
};

export const userOptions = createSlice({
    name: "userOptions",
    initialState,
    reducers: {
        setCurrentUser: (state, action) => {
            state.user = action.payload;
            state.lastFetched = Date.now();
            localStorage.setItem("user", JSON.stringify(action.payload));
            localStorage.setItem("lastFetched", String(state.lastFetched));
        },
        resetUser: (state) => {
            state.user = null;
            state.lastFetched = null;
            localStorage.removeItem("user");
            localStorage.removeItem("lastFetched");
        },
    },
});

export const {setCurrentUser, resetUser} = userOptions.actions;
export default userOptions.reducer;
