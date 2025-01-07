import { TBlog } from "./blog.interface";
import Blog from "./blog.model";

const createBlogIntoDB = async (payload: TBlog) => {
    const result = await Blog.create(payload)
    return result
}
const getALlBlogsFromDB = async () => {
    const result = await Blog.find()
    return result
}
const updateBlogIntoDB = async (id: string, payload: Partial<TBlog>) => {
    const blog = await Blog.findById(id);
    if (!blog) {
        throw new Error('Blog is not exists')
    }
    const result = await Blog.findByIdAndUpdate(id, payload, { new: true })
    return result
}
const deleteBlogFromDB = async (id: string) => {
    const blog = await Blog.findById(id);
    if (!blog) {
        throw new Error('Blog is not exists')
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