import { NextFunction, Request, Response } from "express";
import { TErrorSource } from "../interface/error";
import { ZodError } from "zod";
import handleZodError from "../error/handleZodError";
import handleValidationError from "../error/handle.Validation.Error";
import handleDuplicateError from "../error/handle.Duplicate";
import AppError from "../error/AppError";

const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    // default templet
    let statusCode = 500;
    let message = 'Something going wrong'
    let error: TErrorSource = [
        {
            path: '/',
            message: 'Something going wrong'
        }
    ]

    if (err.code === 11000) {
        const simplifiedError = handleDuplicateError(err)
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        error = simplifiedError?.errorSources
    }
    else if (err instanceof ZodError) {
        const simplifiedError = handleZodError(err)
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        error = simplifiedError.errorSource;

    }
    else if (err.name === "ValidationError") {
        const simplifiedError = handleValidationError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        error = simplifiedError.errorSource;
    }
    else if (err instanceof AppError) {
        statusCode = err?.statusCode;
        message = err?.message;

    }
    res.status(statusCode).json({
        success: false,
        message,
        statusCode,
        error,
        stack: err?.stack
    })
}

export default globalErrorHandler