import {PaginatedResponse} from "@/services/baseTypes";

export interface LeadersResponse {
    paginatedResponse: PaginatedResponse<LeaderCardResponse>;
    currentUser: LeaderCardResponse | null;
}

export interface LeaderCardResponse {
    rank: number;
    img?: string;
    username: string;
    name: string;
    questions: number;
    streak: number;
    score: number;
}