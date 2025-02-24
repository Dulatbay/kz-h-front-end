export interface QuestionCard {
    id: string
    question: string
}

export interface FetchQuestionsRequest {
    topicIds: string[]
}