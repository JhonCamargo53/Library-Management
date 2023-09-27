import { Request, Response } from "express";
import { borrowBookService, getUserBorrowsService, returnBookService } from "../service/BorrowBookService";
import { tokenDecode } from "../helpers/Auth";
import { IUser } from "../interface";

export const getUserBorrows = async (req: Request, res: Response) => {
    try {

        const { id } = tokenDecode(req.headers.authorization?.replace("Bearer", "").trim() as string);
        const bookList = await getUserBorrowsService(id as string);
        res.status(201).send(bookList);

    } catch (error) {
        res.status(500).send("Error al obtener los libros");
        console.log(error);
    }
}


export const borrowBook = async (req: Request, res: Response) => {
    try {

        const { bookId } = req.params;

        const { id } = tokenDecode(req.headers.authorization?.replace("Bearer", "").trim() as string);

        if (await borrowBookService(id as string, bookId)) {
            res.status(201).send("Libro prestado con exito");

        } else {
            res.status(400).send("El libro no se encuentra disponible");
        }

    } catch (error) {
        res.status(500).send("Error al obtener los libros");
        console.log(error);
    }
}

export const returnBook = async (req: Request, res: Response) => {
    try {

        //Validar que quien hace la petición realizo el prestamo (Obtener la id del JWT)

        const { borrowId } = req.params;

        if (await returnBookService(borrowId)) {

            res.status(201).send("Libro devuelto con exito");

        } else {
            res.status(400).send("Prestamo de libro no existente");
        }


    } catch (error) {
        res.status(500).send("Error al devolver el libro " + error);
        console.log(error);
    }
}