import { Request, Response } from "express";
import { userServices } from "./user.service";
import httpStatus from "http-status";
const createUser = async (req: Request, res: Response) => {
    const result = await userServices.createUserIntoDB(req.body);
    res.status(httpStatus.OK).json({
        success: true,
        message: 'User Registerd Successfully',
        data: result
    })
}

export const userController = {
    createUser
}