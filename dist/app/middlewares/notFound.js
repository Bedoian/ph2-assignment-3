"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const notFound = (req, res, next) => {
    const message = 'Something going wrong';
    const err = 'Page not found';
    res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        message,
        err
    });
};
exports.default = notFound;
