import { Request, Response } from "express"
import { authService } from "./auth.service"
import httpStatus from "http-status"
import catchAsync from "../../utils/catchAsync"
const loginUser = async (req: Request, res: Response) => {
    try {
        const user = await authService.loginUser(req.body)
        res.status(httpStatus.OK).json({
            success: true,
            statusCode: 200,
            message: "User logged in successfully",
            data: {
                token: user.token
            }
        })
    }
    catch (err: any) {
        res.status(httpStatus.BAD_REQUEST).json({
            success: false,
            message: 'Invalid credentials',
            statusCode: 401,
            error: { err },
            stack: err.stack
        })
    }
}


export const authController = {
    loginUser
}