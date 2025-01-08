import { Model } from "mongoose";

export type TUser = {
    _id: any;
    name: string;
    email: string;
    password: string;
    role: "admin" | "user";
    isBlocked: boolean;
}

export interface UserModel extends Model<TUser> {
    // myStaticMethod(): number;
    isUserExistsByEmail(email: string): Promise<TUser>
    isPasswordMatched(plainTextPassword: string, hashedPassword: string): Promise<boolean>
   
    
}