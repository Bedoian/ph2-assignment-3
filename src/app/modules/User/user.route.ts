import express from 'express'
import { userController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { userValidations } from './user.validation';

const router = express.Router();

router.post('/create-user', validateRequest(userValidations.createUserZodValidationSchema), userController.createUser)

export const userRoute = router;