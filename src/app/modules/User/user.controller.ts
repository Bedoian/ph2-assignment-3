import { Request, Response } from "express";
import { userServices } from "./user.service";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
const createUser = catchAsync(async (req: Request, res: Response) => {
    const result = await userServices.createUserIntoDB(req.body);
    res.status(httpStatus.OK).json({
        success: true,
        message: 'User Registerd Successfully',
        statusCode: 201,
        data: {
            _id: result._id,
            name: result.name,
            email: result.email
        }
    })
})
const updateUser = catchAsync(async (req: Request, res: Response) => {
    await userServices.updateUserIntoDB(req.params.id);
    res.status(httpStatus.OK).json({
        success: true,
        message: 'User Blocked Successfully',
        statusCode: 200,
    })
})

export const userController = {
    createUser,
    updateUser
}