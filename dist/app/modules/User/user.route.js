"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_validation_1 = require("./user.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
// user route
router.post('/register', (0, validateRequest_1.default)(user_validation_1.userValidations.createUserZodValidationSchema), user_controller_1.userController.createUser);
// admin route
router.patch('/:userId/block', (0, auth_1.default)(['admin']), user_controller_1.userController.blockUser);
exports.userRoute = router;
