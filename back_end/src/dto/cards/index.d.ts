export type CreateCardDataRequest = {
    user: {
        id: string;
        email: string;
        role: string | number;
        username: string;

    }
    term: string;
    define: string;
    image?: any;
    example?: string;
    set_id: string;
}

export type NewCardData = {
    term: string;
    define: string;
    image?: any;
    example?: string;
}

export type UpdateCardDataRequest = {
    user: {
        id: string;
        email: string;
        role: string | number;
        username: string;

    }
    id: string;
    term?: string;
    define?: string;
    image?: any;
    example?: string;
    is_delete_image?: "true" | "false";
}