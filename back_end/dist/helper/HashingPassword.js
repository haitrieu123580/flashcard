"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.hasingPassword = void 0;
const bcrypt_1 = require("bcrypt");
const hasingResult = {
    salt: "",
    password: ""
};
const hasingPassword = (inputString) => {
    const salt = (0, bcrypt_1.genSaltSync)(10);
    const password = (0, bcrypt_1.hashSync)(inputString, salt);
    return {
        salt,
        password
    };
};
exports.hasingPassword = hasingPassword;
const comparePassword = (inputPassword, password) => {
    const result = (0, bcrypt_1.compareSync)(inputPassword, password);
    return result;
};
exports.comparePassword = comparePassword;
