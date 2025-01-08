import { NextFunction, Request, Response } from "express"
import catchAsync from "../utils/catchAsync"
import jwt, { JwtPayload } from "jsonwebtoken"
import config from "../config"
import User from "../modules/User/user.model"

const auth = (requiredRole: string[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const intialToken = req.headers.authorization;
        // console.log(token);
        if (intialToken && !intialToken.startsWith('Bearer')) {
            throw new Error("Invalid token format/_bearer_missing_/")
        }
        const token = intialToken?.split(' ')[1];
        if (!token) {
            throw new Error("Token is not found")
        }

        const decoded = jwt.verify(token, config.access_token_secret as string) as JwtPayload;

        const { userId, email, role } = decoded;

        // check if the user exists in the db
        const user = await User.isUserExistsByEmail(email);
        // console.log(user);
        if (!user) {
            throw new Error('This user is not found !');
        }
        // check if the user is blocked
        if (user.isBlocked) {
            throw new Error('This user is blocked !');
        }
        // check if the token issued before the password changed

        // check if the user role is allowed to access the route
        if (requiredRole && !requiredRole.includes(role)) {
            throw new Error('This user is not allowed to access this route !');
        }
        req.user = decoded as JwtPayload;
        next()
    })
}


export default auth;