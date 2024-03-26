export class Constants {
    static PASSWORD_RESET_OTP_EXPIRE = 60 * 5 * 1000; // 5 minutes in seconds

    static CARD_FLAG = {
        CREATE_MODE: 1,
        EDIT_MODE: 2,
        DELETE_MODE: 3,
    }

    static USER_ROLE = {
        ADMIN: 1,
        USER: 10,
    }

    static DEFAULT_PAGINATION = {
        take: 1,
        skip: 0,
        query: ''
    }
}