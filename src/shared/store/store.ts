import { configureStore } from '@reduxjs/toolkit'
import quizOptionsReducer from './slice'

export const store = configureStore({
  reducer: {
    quizOptions: quizOptionsReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch