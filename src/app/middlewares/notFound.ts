import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";


const notFound = (req: Request, res: Response, next: NextFunction) => {

    const message = 'Something going wrong'
    const err = 'Page not found'
    res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message,
        err

    })

}




export default notFound