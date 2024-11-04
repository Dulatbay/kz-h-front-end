import { createSlice } from '@reduxjs/toolkit'
import { Question } from '../types/Question'

// export const questionsSlice = createSlice({
//   name: 'questionsCreated',
//   initialState: {
//     questions: [] as Question[]
//   },
//   reducers: {
//     add: (state, action) => {
//         state.questions.push(action.payload)
//     },
//     remove: (state, action) => {
//         state.questions.splice(action.payload, 1);
//     }
//   }
// });

export const quizOptions = createSlice({
  name: 'quizOptions',
  initialState: {
    title: '',
    description: '',
    questions: [] as Question[],
    allowPreview: false,
  },
  reducers:{
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
    setAllowPreview: (state, action) => {
      state.allowPreview = action.payload;
    },
  }
})

// export const optionsSlice = createSlice({
//   name: 'options',
//   initialState: {
//     options: [
//       {}
//     ] as Option[]
//   },
//   reducers: {
//     add: (state, action) => {
//       state.options.push(action.payload)
//     },
//     remove: (state, action) => {
//       state.options.splice(action.payload, 1);
//   }
//   }
// });



// Action creators are generated for each case reducer function
export const { addQuestion, removeQuestion, setTitle, setDescription, setAllowPreview } = quizOptions.actions
export default quizOptions.reducer