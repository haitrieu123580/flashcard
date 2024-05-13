import { Sets } from "@src/entity/Sets"
export type SetsServiceResponse = {
    id: string;
    name: string;
    description: string;
    image: string;
    is_public: boolean;
    cards?: {
        id: string;
        term: string;
        define: string;
        image: string;
        example: string;
    }[];
    questions?: {
        id: string;
        question: string;
        answer: string;
    }[];
    created_by: string;
    created_at: Date;
    updated_at: Date;
    totalCards: number;
    totalQuestions: number;
}
export type SetsListResponse = {
    sets: SetsServiceResponse[];
    count: number;
};