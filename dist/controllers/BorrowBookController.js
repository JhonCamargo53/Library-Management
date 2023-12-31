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
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnBook = exports.borrowBook = exports.getUserBorrows = void 0;
const BorrowBookService_1 = require("../service/BorrowBookService");
const Auth_1 = require("../helpers/Auth");
const getUserBorrows = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id } = (0, Auth_1.tokenDecode)((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.replace("Bearer", "").trim());
        const bookList = yield (0, BorrowBookService_1.getUserBorrowsService)(id);
        res.status(201).send(bookList);
    }
    catch (error) {
        res.status(500).send("Error al obtener los libros");
        console.log(error);
    }
});
exports.getUserBorrows = getUserBorrows;
const borrowBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const { bookId } = req.params;
        const { id } = (0, Auth_1.tokenDecode)((_b = req.headers.authorization) === null || _b === void 0 ? void 0 : _b.replace("Bearer", "").trim());
        if (yield (0, BorrowBookService_1.borrowBookService)(id, bookId)) {
            res.status(201).send("Libro prestado con exito");
        }
        else {
            res.status(400).send("El libro no se encuentra disponible");
        }
    }
    catch (error) {
        res.status(500).send("Error al obtener los libros");
        console.log(error);
    }
});
exports.borrowBook = borrowBook;
const returnBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const { id } = (0, Auth_1.tokenDecode)((_c = req.headers.authorization) === null || _c === void 0 ? void 0 : _c.replace("Bearer", "").trim());
        const { bookId } = req.params;
        yield (0, BorrowBookService_1.returnBookService)(bookId, id);
        res.status(201).send("Libro devuelto con exito");
    }
    catch (error) {
        res.status(500).send("Error al devolver el libro " + error);
        console.log(error);
    }
});
exports.returnBook = returnBook;
