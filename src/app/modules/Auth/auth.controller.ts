import { Request, Response } from "express"
import { authService } from "./auth.service"
import httpStatus from "http-status"
import catchAsync from "../../utils/catchAsync"
const loginUser = catchAsync(async (req: Request, res: Response) => {
    const user = await authService.loginUser(req.body)
    res.status(httpStatus.OK).json({
        success: true,
        statusCode: 200,
        message: "Login successful",
        data: {
            token: user.token
        }
    })
})


export const authController = {
    loginUser
}