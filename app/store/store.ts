import {configureStore} from '@reduxjs/toolkit'
import quizOptionsReducer from './slices/quiz-slice/slice'
import userOptions from "@/app/store/slices/user-slice/slice";

export const store = configureStore({
    reducer: {
        quizOptions: quizOptionsReducer,
        userOptions: userOptions
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch