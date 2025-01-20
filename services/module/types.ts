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

export interface LastTopicResponse {
    topicName: string;
    moduleName: string;
    topicNumber: number;
    moduleNumber: number;
    imageUrl: string;
    fullyPassed: boolean;
    didntStart: boolean;
    percent: number;
}


export interface ModuleDetailResponse {
    id: string;
    name: string;
    topicsCount: number;
    number: number;
    active: boolean;
    firstActive: number;
}
