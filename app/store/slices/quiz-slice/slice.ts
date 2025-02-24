import {createSlice} from "@reduxjs/toolkit";
import {Question} from "@/app/[lng]/(main-pages)/quizzes/create/page";
import {ModuleResponse} from "@/services/module/types";

export const quizOptions = createSlice({
    name: 'quizOptions',
    initialState: {
        title: '',
        description: '',
        questions: [] as Question[],
        showQuestions: false,
        selectedTopics: [] as string[],
        moduleResponse: [] as ModuleResponse[],
        currentType: "CREATE" as "CREATE" | "GENERATE"
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
        setSelectedTopics: (state, action) => {
            state.selectedTopics = action.payload;
        },
        setModuleResponse: (state, action) => {
            state.moduleResponse = action.payload;
        },
        setCurrentType: (state, action) => {
            state.currentType = action.payload;
        }
    }
})

export const {
    addQuestion,
    removeQuestion,
    setTitle,
    setDescription,
    setShowQuestions,
    setSelectedTopics,
    setModuleResponse,
    setCurrentType
} = quizOptions.actions
export default quizOptions.reducer