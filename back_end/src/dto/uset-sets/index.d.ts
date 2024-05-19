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

export type QuickAddCardToSetRequest = {
    user: {
        id: string;
        role: string;
        email: string;
        username: string;
    } | undefined;
    cardId: string;
    set_name: string;
}