import { Variant } from "./Variant"

export type Question = {
    'question': string,
    'topicId': string,
    'level': number,
    'durationInSeconds': number,
    'variants': Variant[],
}