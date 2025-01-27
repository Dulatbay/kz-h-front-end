export interface AuthResponse {
    access_token: string;
    refresh_token: string;
}

export interface UserResponse {
    id: string;
    fullName: string | undefined;
    username: string;
    email: string;
    fireDays: number;
    wasPlayedYesterday: boolean;
    answeredQuestionsCount: number;
    score: number;
    accuracy: number;
    joinDate: string;
}