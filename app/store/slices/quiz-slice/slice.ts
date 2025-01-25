import {createSlice} from "@reduxjs/toolkit";
import {Question} from "@/app/[lng]/(main-pages)/quizzes/create/page";

export const quizOptions = createSlice({
    name: 'quizOptions',
    initialState: {
        title: '',
        description: '',
        questions: [] as Question[],
        showQuestions: false,
        language: 'KAZ',
    },
    reducers: {
        addQuestion: (state, action) => {
            state.questions.push(action.payload);
        },
        removeQuestion: (state, action) => {
            state.questions.splice(action.payload, 1);
        },
        setTitle: (state, action) => {
            state.title = action.payload;
        },
        setDescription: (state, action) => {
            state.description = action.payload;
        },
        setShowQuestions: (state, action) => {
            state.showQuestions = action.payload;
        },
        setLanguage: (state, action) => {
            state.language = action.payload;
        }
    }
})

export const {
    addQuestion,
    removeQuestion,
    setTitle,
    setDescription,
    setShowQuestions,
    setLanguage
} = quizOptions.actions
export default quizOptions.reducer