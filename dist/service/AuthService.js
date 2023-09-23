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
exports.loginUserService = exports.registerUserService = void 0;
const firebase_1 = __importDefault(require("firebase"));
const registerUserService = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userCredential = yield firebase_1.default.auth().createUserWithEmailAndPassword(email, password);
        return userCredential.user;
    }
    catch (error) {
        throw error;
    }
});
exports.registerUserService = registerUserService;
const loginUserService = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userCredential = yield firebase_1.default.auth().signInWithEmailAndPassword(email, password);
        return userCredential.user;
    }
    catch (error) {
        throw error;
    }
});
exports.loginUserService = loginUserService;
