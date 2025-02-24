"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const handleZodError_1 = __importDefault(require("../error/handleZodError"));
const handle_Validation_Error_1 = __importDefault(require("../error/handle.Validation.Error"));
const handle_Duplicate_1 = __importDefault(require("../error/handle.Duplicate"));
const AppError_1 = __importDefault(require("../error/AppError"));
const globalErrorHandler = (err, req, res, next) => {
    // default templet
    let statusCode = 500;
    let message = 'Something going wrong';
    let error = [
        {
            path: '/',
            message: 'Something going wrong'
        }
    ];
    if (err.code === 11000) {
        const simplifiedError = (0, handle_Duplicate_1.default)(err);
        statusCode = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode;
        message = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
        error = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorSources;
    }
    else if (err instanceof zod_1.ZodError) {
        const simplifiedError = (0, handleZodError_1.default)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        error = simplifiedError.errorSource;
    }
    else if (err.name === "ValidationError") {
        const simplifiedError = (0, handle_Validation_Error_1.default)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        error = simplifiedError.errorSource;
    }
    else if (err instanceof AppError_1.default) {
        statusCode = err === null || err === void 0 ? void 0 : err.statusCode;
        message = err === null || err === void 0 ? void 0 : err.message;
    }
    res.status(statusCode).json({
        success: false,
        message,
        statusCode,
        error,
        stack: err === null || err === void 0 ? void 0 : err.stack
    });
};
exports.default = globalErrorHandler;
