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
exports.changeAvailabilityService = exports.checkBookAvailabilityService = exports.updateBookService = exports.deleteBookService = exports.addBookService = exports.getAvailableBooksService = exports.getBooksService = void 0;
const firebase_1 = __importDefault(require("../firebase"));
const getBooksService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield firebase_1.default.collection('books').get();
        const bookList = data.docs.map(doc => (Object.assign({ id: doc.id }, doc.data())));
        return bookList;
    }
    catch (error) {
        throw error;
    }
});
exports.getBooksService = getBooksService;
const getAvailableBooksService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield firebase_1.default.collection('books').where('availability', '==', true).get();
        const bookList = data.docs.map(doc => (Object.assign({ id: doc.id }, doc.data())));
        return bookList;
    }
    catch (error) {
        throw error;
    }
});
exports.getAvailableBooksService = getAvailableBooksService;
const addBookService = (book) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield firebase_1.default.collection('books').add(Object.assign(Object.assign({}, book), { availability: true }));
    }
    catch (error) {
        throw error;
    }
});
exports.addBookService = addBookService;
const deleteBookService = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield firebase_1.default.collection('books').doc(bookId).delete();
    }
    catch (error) {
        throw error;
    }
});
exports.deleteBookService = deleteBookService;
const updateBookService = (bookId, updatedBook) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield firebase_1.default.collection('books').doc(bookId).update({
            title: updatedBook.title,
            owner: updatedBook.owner,
            description: updatedBook.description,
            releaseYear: updatedBook.releaseYear,
            imgUrl: updatedBook.imgUrl
        });
    }
    catch (error) {
        throw error;
    }
});
exports.updateBookService = updateBookService;
const checkBookAvailabilityService = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const book = yield firebase_1.default.collection('books').doc(bookId).get();
        return (_a = book.data()) === null || _a === void 0 ? void 0 : _a.availability;
    }
    catch (error) {
        throw error;
    }
});
exports.checkBookAvailabilityService = checkBookAvailabilityService;
const changeAvailabilityService = (bookId, availability) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield firebase_1.default.collection('books').doc(bookId).update({ availability: availability });
    }
    catch (error) {
        throw error;
    }
});
exports.changeAvailabilityService = changeAvailabilityService;
