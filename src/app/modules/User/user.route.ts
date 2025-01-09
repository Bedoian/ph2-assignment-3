import express from 'express'
import { userController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { userValidations } from './user.validation';
import auth from '../../middlewares/auth';

const router = express.Router();
// user route
router.post('/register', validateRequest(userValidations.createUserZodValidationSchema), userController.createUser)
// admin route
router.patch('/:userId/block', auth(['admin']), userController.blockUser)
export const userRoute = router;
