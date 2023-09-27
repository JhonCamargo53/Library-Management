"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const BorrowBookController_1 = require("../controllers/BorrowBookController");
const Auth_1 = require("../middleware/Auth");
const borrowBookRouter = (0, express_1.default)();
borrowBookRouter.get('/borrowBook/getUserBorrows', Auth_1.verifyToken, BorrowBookController_1.getUserBorrows);
borrowBookRouter.post('/borrowBook/borrowBook/:userId/:bookId', Auth_1.verifyToken, BorrowBookController_1.borrowBook);
borrowBookRouter.delete('/borrowBook/returnBook/:borrowId', Auth_1.verifyToken, BorrowBookController_1.returnBook);
exports.default = borrowBookRouter;
