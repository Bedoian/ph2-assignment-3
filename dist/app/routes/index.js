"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../modules/User/user.route");
const blog_route_1 = require("../modules/Blog/blog.route");
const auth_route_1 = require("../modules/Auth/auth.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/auth',
        route: user_route_1.userRoute
    },
    {
        path: '/blogs',
        route: blog_route_1.blogRoute
    },
    {
        path: '/auth',
        route: auth_route_1.authRoute
    },
    // admin routes
    {
        path: '/admin/users',
        route: user_route_1.userRoute
    },
    {
        path: '/admin/blogs',
        route: blog_route_1.blogRoute
    }
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
