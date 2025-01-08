import { Request, Response } from "express";
import { blogServices } from "./blog.service";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
const createBlog = catchAsync(async (req: Request, res: Response) => {
    const { userId } = req.user;
    // console.log(userId);
    const result = await blogServices.createBlogIntoDB(req.body, userId)
    res.status(httpStatus.OK).json({
        success: true,
        message: "Blog created successfully",
        statusCode: 201,
        data: {
            _id: result._id,
            title: result.title,
            content: result.content,
            author: result.author,
        }
    })
})
const getAllBlogs = catchAsync(async (req: Request, res: Response) => {
    // console.log(req.user);
    const result = await blogServices.getALlBlogsFromDB(req.query)
    res.status(httpStatus.OK).json({
        success: true,
        message: "All Blogs fetched successfully",
        statusCode: 200,
        data: result
    })
})
const updateBlog = catchAsync(async (req: Request, res: Response) => {
    const { userId, role } = req.user;
    console.log(req.user);
    const result = await blogServices.updateBlogIntoDB(req.params.id, req.body, userId, role)
    res.status(httpStatus.OK).json({
        success: true,
        message: "Blog updated successfully",
        statusCode: 200,
        data: result
    })
})
const deleteBlog = catchAsync(async (req: Request, res: Response) => {
    const { userId, role } = req.user;
    await blogServices.deleteBlogFromDB(req.params.id, userId, role)
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
})
export const blogController = {
    createBlog,
    updateBlog,
    deleteBlog,
    getAllBlogs
}