import { Request, Response } from "express";
import { addBookService, deleteBookService, getBooksService, updateBookService } from "../service/BookService";

export const getBooks = async (req: Request, res: Response) => {
    try {

        const bookList = await getBooksService();
        res.status(201).send(bookList);

    } catch (error) {
        res.status(500).send("Error al obtener los libros");
        console.log(error);
    }
}

export const addBook = async (req: Request, res: Response) => {
    try {

        const { book } = req.body;

        const response = await addBookService(book);

        res.status(201).send({id:response.id,availability:true, ...book});

    } catch (error) {
        console.log(error);
        res.status(500).send("Error al agregar un libro");
    }
}
 
export const updateBook = async (req: Request, res: Response) => {
    try {

        const { book, bookId } = req.body;
        await updateBookService(bookId, book);

        res.status(201).send("Libro actualizado con exito");

    } catch (error) {
        res.status(500).send("Error al actualizar el libro");
        console.log(error);
    }
}

export const deleteBook = async (req: Request, res: Response) => {
    try {

        const { bookId } = req.params;
        await deleteBookService(bookId);

        res.status(201).send("Libro borrado con exito");

    } catch (error) {
        res.status(500).send("Error al borrar el libro");
        console.log(error);
    }
}

