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
exports.deleteBook = exports.updateBook = exports.addBook = exports.getAvailableBooks = exports.getBooks = void 0;
const BookService_1 = require("../service/BookService");
const getBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookList = yield (0, BookService_1.getBooksService)();
        res.status(201).send(bookList);
    }
    catch (error) {
        res.status(500).send("Error al obtener los libros");
        console.log(error);
    }
});
exports.getBooks = getBooks;
const getAvailableBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookList = yield (0, BookService_1.getAvailableBooksService)();
        res.status(201).send(bookList);
    }
    catch (error) {
        res.status(500).send("Error al obtener los libros");
        console.log(error);
    }
});
exports.getAvailableBooks = getAvailableBooks;
const addBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { book } = req.body;
        const response = yield (0, BookService_1.addBookService)(book);
        res.status(201).send(Object.assign({ id: response.id, availability: true }, book));
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Error al agregar un libro");
    }
});
exports.addBook = addBook;
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { book } = req.body;
        yield (0, BookService_1.updateBookService)(book.id, book);
        res.status(201).send("Libro actualizado con exito");
    }
    catch (error) {
        res.status(500).send("Error al actualizar el libro");
        console.log(error);
    }
});
exports.updateBook = updateBook;
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        yield (0, BookService_1.deleteBookService)(bookId);
        res.status(201).send("Libro borrado con exito");
    }
    catch (error) {
        res.status(500).send("Error al borrar el libro");
        console.log(error);
    }
});
exports.deleteBook = deleteBook;
