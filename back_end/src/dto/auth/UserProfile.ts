export class UserProfile {
    username: string
    email: string
    avatar: string
    constructor(user: any) {
        this.username = user.username;
        this.email = user.email;
        this.avatar = user.avatar;
    }
}