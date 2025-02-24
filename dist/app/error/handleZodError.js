"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleZodError = (err) => {
    const errorSource = err.issues.map((issue) => {
        return {
            path: issue === null || issue === void 0 ? void 0 : issue.path[(issue === null || issue === void 0 ? void 0 : issue.path.length) - 1],
            message: issue === null || issue === void 0 ? void 0 : issue.message
        };
    });
    const statusCode = 500;
    return {
        statusCode,
        message: 'Zod Validation error',
        errorSource
    };
};
exports.default = handleZodError;
