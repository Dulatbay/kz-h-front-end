export interface QuizResponse{
    gameId: string;
    totalQuestions: number;
    currentQuestionIndex: number;
    currentQuestion: QuizQuestion;
    previousQuestion: null | string;
}

export interface QuizQuestion {
    quizQuestionId: string;
    question: string;
    questionIdx: number;
    duration: number;
    variants: string[];
}