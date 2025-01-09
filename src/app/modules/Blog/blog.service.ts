import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../error/AppError";
import { searchableBlogFields } from "./blog.constant";
import { TBlog } from "./blog.interface";
import Blog from "./blog.model";
import httpStatus from "http-status";
const createBlogIntoDB = async (payload: TBlog, author: string) => {
    const result = (await Blog.create({ ...payload, author })).populate('author')
    return result
}
const getALlBlogsFromDB = async (query: Record<string, unknown>) => {
    const blogQuery = new QueryBuilder(Blog.find(), query)
        .search(searchableBlogFields)
        .sort()
        .filter()

    const result = await blogQuery.modelQuery.populate('author')
    return result
}
const updateBlogIntoDB = async (id: string, payload: Partial<TBlog>, authorId: string, userRole: string) => {
    // console.log(id, payload, authorId, userRole);
    const blog = await Blog.findById(id);
    if (!blog) {
        throw new AppError(httpStatus.NOT_FOUND, 'Blog is not exists')
    }
    // authorId);
    if (blog.author?.toString() !== authorId) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized to update this blog')
    }
    const result = await Blog.findByIdAndUpdate(id, payload, { new: true }).populate('author')
    return result
}
const deleteBlogFromDB = async (id: string, authorId: string, userRole: string) => {
    console.log(userRole);
    const blog = await Blog.findById(id);
    if (!blog) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'Blog is not exists')
    }

    if (userRole !== 'admin' && blog?.author?.toString() !== authorId) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized to delete this blog')
    }
    const result = await Blog.findByIdAndDelete(id)
    return result
}
export const blogServices = {
    createBlogIntoDB,
    updateBlogIntoDB,
    deleteBlogFromDB,
    getALlBlogsFromDB
}