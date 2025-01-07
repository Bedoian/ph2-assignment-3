import { Request, Response } from "express";
import { blogServices } from "./blog.service";
import httpStatus from "http-status";
const createBlog = async (req: Request, res: Response) => {
    const result = await blogServices.createBlogIntoDB(req.body)
    res.status(httpStatus.OK).json({
        success: true,
        message: "Blog created successfully",
        statusCode: 201,
        data: {
            _id: result._id,
            title: result.title,
            content: result.content
        }
    })
}
const getAllBlogs= async (req: Request, res: Response) => { 
    const result = await blogServices.getALlBlogsFromDB()
    res.status(httpStatus.OK).json({
        success: true,
        message: "All Blogs fetched successfully",
        statusCode: 200,
        data: result
    })
}
const updateBlog = async (req: Request, res: Response) => {
    const result = await blogServices.updateBlogIntoDB(req.params.id, req.body)
    res.status(httpStatus.OK).json({
        success: true,
        message: "Blog updated successfully",
        statusCode: 200,
        data: {
            _id: result?._id,
            title: result?.title,
            content: result?.content
        }
    })
}
const deleteBlog = async (req: Request, res: Response) => {
    await blogServices.deleteBlogFromDB(req.params.id)
    res.status(httpStatus.OK).json({
        success: true,
        message: "Blog deleted successfully",
        statusCode: 200,
        data: {
            success: true,
            message: "Blog deleted successfully",
            statusCode: 200
        }
    })
}
export const blogController = {
    createBlog,
    updateBlog,
    deleteBlog,
    getAllBlogs
}