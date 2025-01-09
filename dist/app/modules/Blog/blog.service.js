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
exports.blogServices = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../error/AppError"));
const blog_constant_1 = require("./blog.constant");
const blog_model_1 = __importDefault(require("./blog.model"));
const http_status_1 = __importDefault(require("http-status"));
const createBlogIntoDB = (payload, author) => __awaiter(void 0, void 0, void 0, function* () {
    const result = (yield blog_model_1.default.create(Object.assign(Object.assign({}, payload), { author }))).populate('author');
    return result;
});
const getALlBlogsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const blogQuery = new QueryBuilder_1.default(blog_model_1.default.find(), query)
        .search(blog_constant_1.searchableBlogFields)
        .sort()
        .filter();
    const result = yield blogQuery.modelQuery.populate('author');
    return result;
});
const updateBlogIntoDB = (id, payload, authorId, userRole) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // console.log(id, payload, authorId, userRole);
    const blog = yield blog_model_1.default.findById(id);
    if (!blog) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Blog is not exists');
    }
    // authorId);
    if (((_a = blog.author) === null || _a === void 0 ? void 0 : _a.toString()) !== authorId) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized to update this blog');
    }
    const result = yield blog_model_1.default.findByIdAndUpdate(id, payload, { new: true }).populate('author');
    return result;
});
const deleteBlogFromDB = (id, authorId, userRole) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log(userRole);
    const blog = yield blog_model_1.default.findById(id);
    if (!blog) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'Blog is not exists');
    }
    if (userRole !== 'admin' && ((_a = blog === null || blog === void 0 ? void 0 : blog.author) === null || _a === void 0 ? void 0 : _a.toString()) !== authorId) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized to delete this blog');
    }
    const result = yield blog_model_1.default.findByIdAndDelete(id);
    return result;
});
exports.blogServices = {
    createBlogIntoDB,
    updateBlogIntoDB,
    deleteBlogFromDB,
    getALlBlogsFromDB
};
