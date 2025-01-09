import { Router } from "express";
import { userRoute } from "../modules/User/user.route";
import { blogRoute } from "../modules/Blog/blog.route";
import { authRoute } from "../modules/Auth/auth.route";


const router = Router();

const moduleRoutes = [
    {
        path: '/auth',
        route: userRoute
    },
    {
        path: '/blogs',
        route: blogRoute
    },
    {
        path: '/auth',
        route: authRoute
    },
    // admin routes
    {
        path: '/admin/users',
        route: userRoute
    },
    {
        path: '/admin/blogs',
        route: blogRoute
    }
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))
export default router