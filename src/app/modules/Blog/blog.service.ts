import QueryBuilder from "../../builder/QueryBuilder";
import { searchableBlogFields } from "./blog.constant";
import { TBlog } from "./blog.interface";
import Blog from "./blog.model";
const createBlogIntoDB = async (payload: TBlog, author: string) => {
    const result = await Blog.create({ ...payload, author })
    return result
}
const getALlBlogsFromDB = async (query: Record<string, unknown>) => {
    const blogQuery = new QueryBuilder(Blog.find(), query)
        .search(searchableBlogFields)
        .sort()
        .filter()

    const result = await blogQuery.modelQuery
    return result
}
const updateBlogIntoDB = async (id: string, payload: Partial<TBlog>, authorId: string, userRole: string) => {
    console.log(userRole);

    const blog = await Blog.findById(id);
    if (!blog) {
        throw new Error('Blog is not exists')
    }
    // console.log(blog.author?.toString(),
    // authorId);
    if (blog.author?.toString() !== authorId) {
        throw new Error('You are not authorized to update this blog')
    }
    const result = await Blog.findByIdAndUpdate(id, payload, { new: true })
    return result
}
const deleteBlogFromDB = async (id: string, authorId: string, userRole: string) => {

    const blog = await Blog.findById(id);
    if (!blog) {
        throw new Error('Blog is not exists')
    }

    if (blog.author?.toString() !== authorId) {
        throw new Error('You are not authorized to delete this blog')
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