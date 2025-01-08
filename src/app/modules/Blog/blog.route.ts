import { Router } from 'express'
import { blogController } from './blog.controller'
import validateRequest from '../../middlewares/validateRequest'
import { blogValidation } from './blog.validation'
import auth from '../../middlewares/auth'

const router = Router()

router.post('/', auth(['user']), validateRequest(blogValidation.createBlogValidationSchema), blogController.createBlog)
router.patch('/:id', auth(['user']), blogController.updateBlog)
router.delete('/:id', auth(['user', 'admin']), blogController.deleteBlog)
router.get('/', auth(['user']), blogController.getAllBlogs)



export const blogRoute = router