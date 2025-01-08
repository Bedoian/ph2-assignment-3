import { model, Schema } from "mongoose";
import { TUser, UserModel } from "./user.interface";
import bcrypt from 'bcrypt'
import config from "../../config";

const userSchema = new Schema<TUser,UserModel>({
    name: {
        type: String,
        trim: true,
        maxlength: [20, 'name cannot be morethen 20 character'],
        required: true
    },
    email: {
        type: String,
        required: [true, 'Vai email sara kmne hoibo?'],
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ["admin", "user"],
        default: "user"
    },
    isBlocked: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

userSchema.pre('save', async function (next) {
    // get the inserted user
    const user = this
    user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt))
    next()
})
userSchema.statics.isUserExistsByEmail= async function (email: string) {
    return await User.findOne({email:email})
}
userSchema.statics.isPasswordMatched=async function (plainTextPassword: string, hashedPassword: string) {
    return await bcrypt.compare(plainTextPassword, hashedPassword)
}
const User = model<TUser,UserModel>('User', userSchema)
export default User