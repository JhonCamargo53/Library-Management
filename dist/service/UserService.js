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
exports.getUserValuesByUIDService = exports.getUserByUID = exports.addUserService = void 0;
const firebase_1 = __importDefault(require("../firebase"));
const addUserService = (userId, user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield firebase_1.default.collection('users').doc(userId).set(user);
    }
    catch (error) {
        throw error;
    }
});
exports.addUserService = addUserService;
const getUserByUID = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield firebase_1.default.collection('users').add(user);
    }
    catch (error) {
        throw error;
    }
});
exports.getUserByUID = getUserByUID;
const getUserValuesByUIDService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userDoc = firebase_1.default.collection('users').doc(userId);
        const user = yield userDoc.get();
        if (user.exists) {
            const data = user.data();
            return Object.assign({ id: userId }, data);
        }
        else {
            return null;
        }
    }
    catch (error) {
        throw error;
    }
});
exports.getUserValuesByUIDService = getUserValuesByUIDService;
