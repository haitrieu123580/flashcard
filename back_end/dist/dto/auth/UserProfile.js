"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProfile = void 0;
class UserProfile {
    constructor(user) {
        this.username = user.username;
        this.email = user.email;
        this.avatar = user.avatar;
    }
}
exports.UserProfile = UserProfile;
