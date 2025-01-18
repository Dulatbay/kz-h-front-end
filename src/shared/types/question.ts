import { Variant } from "./variant"

export type Question = {
    'question': string,
    'topicId': string,
    'level': number,
    'durationInSeconds': number,
    'variants': Variant[],
}