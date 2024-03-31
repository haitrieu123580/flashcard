"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genOTP = void 0;
const genOTP = () => {
    let otp = Math.floor(1000 + Math.random() * 9000);
    return otp;
};
exports.genOTP = genOTP;
