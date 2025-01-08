import config from "../../config";
import User from "../User/user.model";
import { TUserLogin } from "./auth.interface";
import jwt from "jsonwebtoken";
const loginUser = async (payload: TUserLogin) => {
    const user = await User.isUserExistsByEmail(payload.email);

    // console.log((user._id).toString());
    if (!user) {
        console.log('paina');
        throw new Error('User not found')
    }
    if (user?.isBlocked) {
        throw new Error('User is blocked')
    }

    if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
        throw new Error('Password not matched')
    }

    const jwtPayload = {
        userId: user._id,
        email: user.email,
        role: user.role,
    }
    const token = jwt.sign(jwtPayload, config.access_token_secret as string, {
        expiresIn: config.access_token_expairs_in
    })

    return {
        token
    }

}



export const authService = {
    loginUser
}