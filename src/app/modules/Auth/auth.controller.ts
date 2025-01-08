import { Request, Response } from "express"
import catchAsync from "../../utils/catchAsync"
import { authService } from "./auth.service"
import httpStatus from "http-status"
const loginUser = catchAsync(async (req: Request, res: Response) => {
    const user = await authService.loginUser(req.body)
    res.status(httpStatus.OK).json({
        success: true,
        statusCode: 200,
        message: "User logged in successfully",
        data: {
            token: user.token
        }
    })
})

export const authController = {
    loginUser
}