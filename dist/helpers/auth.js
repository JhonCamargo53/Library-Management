"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenDecode = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (user) => {
    return jsonwebtoken_1.default.sign({ user }, process.env.JWTKEY || 'NOT TOKEN USED', { expiresIn: '60m' });
};
exports.generateToken = generateToken;
const tokenDecode = (token) => {
    const validatedToken = jsonwebtoken_1.default.verify(token, process.env.JWTKEY || 'NOT TOKEN USED');
    return JSON.parse(validatedToken.user);
};
exports.tokenDecode = tokenDecode;
