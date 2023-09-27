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
exports.returnBookService = exports.borrowBookService = exports.getUserBorrowsService = void 0;
const firebase_1 = __importDefault(require("../firebase"));
const BookService_1 = require("./BookService");
const getUserBorrowsService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookIds = [];
        const borrowsQuery = yield firebase_1.default.collection('borrows').where('userId', '==', userId).get();
        borrowsQuery.forEach(borrowDoc => {
            bookIds.push(borrowDoc.data().bookId);
        });
        const books = [];
        for (const bookId of bookIds) {
            const bookDoc = yield firebase_1.default.collection('books').doc(bookId).get();
            if (bookDoc.exists) {
                books.push(Object.assign({ id: bookDoc.id }, bookDoc.data()));
            }
        }
        return books;
    }
    catch (error) {
        throw error;
    }
});
exports.getUserBorrowsService = getUserBorrowsService;
const borrowBookService = (userId, bookId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(yield (0, BookService_1.checkBookAvailabilityService)(bookId));
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
const returnBookService = (bookId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const borrowsQuery = yield firebase_1.default.collection('borrows').where('bookId', '==', bookId).get();
        borrowsQuery.forEach((doc) => __awaiter(void 0, void 0, void 0, function* () {
            const borrowData = doc.data();
            if (borrowData.userId === userId) {
                // Elimina el registro de borrows
                yield firebase_1.default.collection('borrows').doc(doc.id).delete();
                // Cambia la disponibilidad del libro a true
                yield (0, BookService_1.changeAvailabilityService)(bookId, true);
            }
            else {
                throw ('El usuario con ID' + userId + 'no tiene permiso para devolver este libro.');
            }
        }));
    }
    catch (error) {
        throw error;
    }
});
exports.returnBookService = returnBookService;
