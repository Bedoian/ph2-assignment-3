import { TUser } from "./user.interface";
import User from "./user.model";

const createUserIntoDB = async (payload: TUser) => {
    const result = await User.create(payload)
    return result
}
const updateUserIntoDB = async (id: string, payload: Record<string, boolean>) => {
    const user = await User.findById(id);
    if (!user) {
        throw new Error('User is not exists')
    }
    const result = await User.findByIdAndUpdate(id, payload, { new: true })
    return result
}
export const userServices = {
    createUserIntoDB,
    updateUserIntoDB
}