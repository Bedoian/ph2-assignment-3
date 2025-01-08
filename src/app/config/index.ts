import dotenv from 'dotenv'
import { access } from 'fs'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
    NODE_ENV: process.env.NODE_ENV,
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
    bcrypt_salt: process.env.BCRYPT_SALT,
    default_password: process.env.DEFAULT_PASS,
    access_token_secret: process.env.JWT_ACCESS_SECRET,
    access_token_expairs_in: process.env.JWT_ACCESS_EXPIRES_IN
}