import { NextFunction, Request, Response } from "express";
import { TErrorSource } from "../interface/error";
import { ZodError } from "zod";
import handleZodError from "../error/handleZodError";

const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    // default templet
    let statusCode = 500;
    let message = 'Something going wrong'
    let errorSources: TErrorSource = [
        {
            path: '/',
            message: 'Something going wrong'
        }
    ]

    if (err instanceof ZodError) {
        const simplifiedError = handleZodError(err)
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSource;

    }
    return res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        stack: err?.stack,
        err
    })
}

export default globalErrorHandler