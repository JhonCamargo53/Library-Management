"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthController_1 = require("../controllers/AuthController");
const authRouter = (0, express_1.default)();
authRouter.post('/auth/registerUser', AuthController_1.registerUser);
authRouter.post('/auth/loginUser', AuthController_1.loginUser);
exports.default = authRouter;
