export type CopyCardToSetRequest = {
    user: {
        id: string;
        email: string;
        role: string;
        username: string;
    }
    setId: string;
    cardId: string;
};