"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isValidRequest = (targetRequest) => {
    return async (request, response, next) => {
        try {
            if (validateRequest(request.body, targetRequest) && validateNotNull(request.body)) {
                next();
            }
            else {
                response.status(400).json({ error: 'Invalid request format' });
            }
        }
        catch (error) {
            console.error(error);
            response.status(500).json({ error: 'Internal Server Error' });
        }
    };
};
const validateRequest = (requestData, expectedType) => {
    for (const key in expectedType) {
        if (typeof requestData[key] !== typeof expectedType[key]) {
            return false;
        }
    }
    return true;
};
const validateNotNull = (requestData) => {
    for (const key in requestData) {
        if (requestData[key] === "" || requestData[key] === null || requestData[key] === undefined) {
            return false;
        }
    }
    return true;
};
exports.default = isValidRequest;
