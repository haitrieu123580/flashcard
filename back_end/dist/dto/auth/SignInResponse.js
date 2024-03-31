"use strict";
class SignInResponse {
    constructor(access_token, refresh_token) {
        this.access_token = access_token;
        this.refresh_token = refresh_token;
    }
}
module.exports = SignInResponse;
