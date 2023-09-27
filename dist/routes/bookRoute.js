"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const BookController_1 = require("../controllers/BookController");
const Auth_1 = require("../middleware/Auth");
const bookRouter = (0, express_1.default)();
bookRouter.get('/book/getBooks', Auth_1.verifyToken, BookController_1.getBooks);
bookRouter.get('/book/getAvailableBooks', Auth_1.verifyToken, BookController_1.getAvailableBooks);
bookRouter.post('/book/addBook', Auth_1.verifyAdminToken, BookController_1.addBook);
bookRouter.put('/book/updateBook', Auth_1.verifyAdminToken, BookController_1.updateBook);
bookRouter.delete('/book/deleteBook/:bookId', Auth_1.verifyAdminToken, BookController_1.deleteBook);
exports.default = bookRouter;
