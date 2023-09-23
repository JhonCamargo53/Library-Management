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
exports.returnBookService = exports.borrowBookService = void 0;
const firebase_1 = __importDefault(require("../firebase"));
const BookService_1 = require("./BookService");
const borrowBookService = (userId, bookId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (yield (0, BookService_1.checkBookAvailabilityService)(bookId)) {
            yield firebase_1.default.collection('borrows').add({
                userId,
                bookId,
            });
            yield (0, BookService_1.changeAvailabilityService)(bookId, false);
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        throw error;
    }
});
exports.borrowBookService = borrowBookService;
const returnBookService = (borrowId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const borrowDocRef = firebase_1.default.collection('borrows').doc(borrowId);
        const borrowDoc = yield borrowDocRef.get();
        if (borrowDoc.exists) {
            const borrowData = borrowDoc.data();
            const borrowBookId = borrowData === null || borrowData === void 0 ? void 0 : borrowData.bookId;
            yield (0, BookService_1.changeAvailabilityService)(borrowBookId, true);
            yield borrowDocRef.delete();
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        throw error;
    }
});
exports.returnBookService = returnBookService;
