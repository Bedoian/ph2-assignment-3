import AppError from "../../error/AppError";
import { TUser } from "./user.interface";
import User from "./user.model";
import httpStatus from "http-status";
const createUserIntoDB = async (payload: TUser) => {
    const result = await User.create(payload)
    return result
}
const updateUserIntoDB = async (id: string) => {
    const user = await User.findById(id);
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND,'User is not exists')
    }
    const result = await User.findByIdAndUpdate(id, { isBlocked: true }, { new: true })
    return result
}
export const userServices = {
    createUserIntoDB,
    updateUserIntoDB
}