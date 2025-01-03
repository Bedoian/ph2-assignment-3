import { model, Schema } from "mongoose";
import { TUser, TUsername } from "./user.interface";
import bcrypt from 'bcrypt'
import config from "../../config";

const userNameScehma = new Schema<TUsername>(
    {
        firstName: {
            type: String,
            trim: true,
            maxlength: [20, 'firstname cannot be morethen 20 character'],
            required: [true, 'Vai email sara kmne hoibo?']

        },
        middleName: { type: String },
        lastName: {
            type: String,
            required: [true, 'Vai email sara kmne hoibo?']
        }
    }
)
const userSchema = new Schema<TUser>({
    name: userNameScehma,
    email: {
        type: String, required: [true, 'Vai email sara kmne hoibo?'],
        match: [
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "Please enter a valid email address",
        ],
    },
    password: {
        type: String,
        required: true,
        select: 0
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


const User = model<TUser>('User', userSchema)
export default User