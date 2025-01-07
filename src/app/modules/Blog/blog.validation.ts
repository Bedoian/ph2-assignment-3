import { z } from "zod";

const createBlogValidationSchema = z.object({
    title: z.string(),
    content: z.string()
})



export const blogValidation = {
    createBlogValidationSchema
}