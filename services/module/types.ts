export interface TopicResponse {
    topicId: string;
    topicName: string;
}

export interface ModuleResponse {
    id: string;
    name: string;
    imageUrl: string;
    questionNumbers: number;
    duration: number;
    passedUsersCount: number;
    number: number;
    difficulty: number;
    topics: TopicResponse[];
}

export interface ModuleDetailResponse {
    id: string;
    name: string;
    topicsCount: number;
    number: number;
    active: boolean;
    firstActive: number;
}
