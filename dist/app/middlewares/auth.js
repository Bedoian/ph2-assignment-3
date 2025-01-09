"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const user_model_1 = __importDefault(require("../modules/User/user.model"));
const AppError_1 = __importDefault(require("../error/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const auth = (requiredRole) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const intialToken = req.headers.authorization;
        // console.log(token);
        if (intialToken && !intialToken.startsWith('Bearer')) {
            throw new AppError_1.default(http_status_1.default.FORBIDDEN, "Invalid token format/_bearer_missing_/");
        }
        const token = intialToken === null || intialToken === void 0 ? void 0 : intialToken.split(' ')[1];
        if (!token) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Token is not found");
        }
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.access_token_secret);
        const { userId, email, role } = decoded;
        // check if the user exists in the db
        const user = yield user_model_1.default.isUserExistsByEmail(email);
        // console.log(user);
        if (!user) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This user is not found !');
        }
        // check if the user is blocked
        if (user.isBlocked) {
            throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'This user is blocked !');
        }
        // check if the token issued before the password changed
        // check if the user role is allowed to access the route
        if (requiredRole && !requiredRole.includes(role)) {
            throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'This user is not allowed to access this route !');
        }
        req.user = decoded;
        next();
    }));
};
exports.default = auth;
