export interface TranslationTypes {
    "header": {
        "streak": string,
        "learn": string,
        "quizzes": string,
        "map": string,
        "leaders": string,
        "archive": string,
    },
    "learn-page": {
        learning: string,
        description: string,
        modules: string,
    },
    "module": {
        questions: string,
        minutes: string,
        users: string,
        start: string
    },
    "quizzes-page": {
        quizzes: string,
        topics: string,
        difficulty: string,
        status: string,
        search: string,
        pickOne: string,
        title: string,
        average: string,
        questions: string,
    },
    "profile-page": {
        joined: string,
        overview: string,
        fireDays: string,
        score: string,
        questions: string,
        accuracy: string,
    },
    "leaderboard-page": {
        leaderboard: string,
        description: string,
        users: string,
        rank: string,
        name: string,
        questions: string,
        streak: string,
        score: string
    }
}