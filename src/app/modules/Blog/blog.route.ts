import express, { Router } from 'express'
import { blogController } from './blog.controller'
import validateRequest from '../../middlewares/validateRequest'
import { blogValidation } from './blog.validation'

const router = Router()

router.post('/', validateRequest(blogValidation.createBlogValidationSchema), blogController.createBlog)
router.patch('/:id', blogController.updateBlog)
router.delete('/:id', blogController.deleteBlog)
router.get('/', blogController.getAllBlogs)



export const blogRoute = router