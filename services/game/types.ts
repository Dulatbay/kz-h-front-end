export interface GameByIdResponse {
    gameId: string;
    quizId: string;
    quizName: string;
    duration: number;
    result: number;
    beats: number;
    record: number;
    currentQuestionIdx: number;
    questionCount: number;
    startTime: string;
    endTime: string;
    answeredQuestions: AnsweredQuestionResponse[];
    finished: boolean;
}


export interface AnsweredQuestionResponse {
    question: string;
    questionId: string;
    variants: SelectedVariant[];
}

export interface ProcessGameResponse {
    gameId: string;
    totalQuestions: number;
    currentQuestionIndex: number;
    currentQuestion: QuizQuestion;
    previousQuestion: PreviousQuestion;
}


interface QuizQuestion {
    quizQuestionId: string;
    question: string;
    questionIdx: number;
    duration: number;
    variants: string[];
}

interface PreviousQuestion {
    quizQuestionId: string;
    question: string;
    questionIdx: number;
    variants: Variant[];
}


export interface Variant {
    answer: string;
    correct: boolean;
}

export interface SelectedVariant extends Variant {
    chosen: boolean;
}
