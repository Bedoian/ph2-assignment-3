import { Router } from "express";
import { userRoute } from "../modules/User/user.route";
import { blogRoute } from "../modules/Blog/blog.route";
import { authRoute } from "../modules/Auth/auth.route";


const router = Router();

const moduleRoutes = [
    {
        path: '/users',
        route: userRoute
    },
    {
        path: '/blogs',
        route: blogRoute
    },
    {
        path: '/auth',
        route: authRoute
    }
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))
export default router