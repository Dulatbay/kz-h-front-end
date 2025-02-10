export interface QuizByIdResponse {
    id: string
    title: string
    description: string
    questions: string[]
    createdDate: string
    questionsCount: number
    inProgress: boolean
    status: boolean
    gameId: string
    verified: boolean
}


export interface QuizCardResponse {
    id: string
    title: string
    status: boolean
    inProgress: boolean
    average: number
    level: string
    questions: number
    createdDate: string
    gameId: string
    verified: boolean
}

export interface Tag {
    "type": string;
    "value": string;
    "query_value": string;
}


