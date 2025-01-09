"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRoute = void 0;
const express_1 = require("express");
const blog_controller_1 = require("./blog.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const blog_validation_1 = require("./blog.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = (0, express_1.Router)();
router.post('/', (0, auth_1.default)(['user']), (0, validateRequest_1.default)(blog_validation_1.blogValidation.createBlogValidationSchema), blog_controller_1.blogController.createBlog);
router.patch('/:id', (0, auth_1.default)(['user']), blog_controller_1.blogController.updateBlog);
router.delete('/:id', (0, auth_1.default)(['user', 'admin']), blog_controller_1.blogController.deleteBlog);
router.get('/', (0, auth_1.default)(['user', 'admin']), blog_controller_1.blogController.getAllBlogs);
exports.blogRoute = router;
