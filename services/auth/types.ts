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
    imageUrl: string | null;
}

export interface Session {
    tokenId: string;
    remoteAddress: string;
    remoteHost: string;
    userAgent: string;
    expiredAt: string;
    createdDate: string;
    currentSession: boolean;
}

export interface SessionsResponse {
    webSessions: Session[];
    mobileSessions: Session[];
}