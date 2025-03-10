export interface QuestionCard {
    id: string
    question: string
}

export interface Topic{
    topicId: string
    topicName: string
}

export interface Question {
    questionId: string
    question: string
    topicName: string
    topicIds: Topic[]
    variants: string[]
}

export interface Result{
    text: string
    selected: boolean
    correct: boolean
}

export interface FetchQuestionsRequest {
    topicIds: string[]
}

export interface AnswerRequest {
    selectedOptions: string[]
}

export interface Mistake {
    questionId: string
    question: string
    topicName: string
    topicIds: Topic[]
    variants: string[]
    mistakeQuestionId: string
}