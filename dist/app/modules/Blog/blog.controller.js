"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogController = void 0;
const blog_service_1 = require("./blog.service");
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const createBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.user;
    // console.log(userId);
    const result = yield blog_service_1.blogServices.createBlogIntoDB(req.body, userId);
    res.status(http_status_1.default.OK).json({
        success: true,
        message: "Blog created successfully",
        statusCode: 201,
        data: {
            _id: result._id,
            title: result.title,
            content: result.content,
            author: result.author,
        }
    });
}));
const getAllBlogs = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.user);
    const result = yield blog_service_1.blogServices.getALlBlogsFromDB(req.query);
    res.status(http_status_1.default.OK).json({
        success: true,
        message: "Blogs fetched successfully",
        statusCode: 200,
        data: result
    });
}));
const updateBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, role } = req.user;
    // console.loag(req.user);
    const result = yield blog_service_1.blogServices.updateBlogIntoDB(req.params.id, req.body, userId, role);
    res.status(http_status_1.default.OK).json({
        success: true,
        message: "Blog updated successfully",
        statusCode: 200,
        data: {
            _id: result === null || result === void 0 ? void 0 : result._id,
            title: result === null || result === void 0 ? void 0 : result.title,
            content: result === null || result === void 0 ? void 0 : result.content,
            author: result === null || result === void 0 ? void 0 : result.author,
        }
    });
}));
const deleteBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, role } = req.user;
    yield blog_service_1.blogServices.deleteBlogFromDB(req.params.id, userId, role);
    res.status(http_status_1.default.OK).json({
        success: true,
        message: "Blog deleted successfully",
        statusCode: 200,
    });
}));
exports.blogController = {
    createBlog,
    updateBlog,
    deleteBlog,
    getAllBlogs
};
