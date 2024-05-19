export type EditUserProfileRequest = {
    image?: any;
    username?: string;
    email?: string;
    user: {
        id: string;
        role: string;
        email: string;
        username: string;
    } | undefined;
}