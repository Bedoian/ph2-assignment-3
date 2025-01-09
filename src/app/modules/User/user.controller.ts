import { Request, Response } from "express";
import { userServices } from "./user.service";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
const createUser = catchAsync(async (req: Request, res: Response) => {
    const result = await userServices.createUserIntoDB(req.body);
    res.status(httpStatus.OK).json({
        success: true,
        message: 'User registerd successfully',
        statusCode: 201,
        data: {
            _id: result._id,
            name: result.name,
            email: result.email
        }
    })
})
const blockUser = catchAsync(async (req: Request, res: Response) => {
    await userServices.updateUserIntoDB(req.params.userId);
    res.status(httpStatus.OK).json({
        success: true,
        message: 'User Blocked Successfully',
        statusCode: 200,
    })
})

export const userController = {
    createUser,
    blockUser
}