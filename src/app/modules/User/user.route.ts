import express from 'express'
import { userController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { userValidations } from './user.validation';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post('/register', validateRequest(userValidations.createUserZodValidationSchema), userController.createUser)
router.patch('/:id/block', auth(['admin']), userController.updateUser)
export const userRoute = router;