"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Constants = void 0;
class Constants {
}
exports.Constants = Constants;
Constants.PASSWORD_RESET_OTP_EXPIRE = 60 * 5 * 1000; // 5 minutes in seconds
Constants.CARD_FLAG = {
    CREATE_MODE: 1,
    EDIT_MODE: 2,
    DELETE_MODE: 3,
};
Constants.USER_ROLE = {
    ADMIN: 1,
    USER: 10,
};
Constants.DEFAULT_PAGINATION = {
    take: 1,
    skip: 0,
    query: ''
};
