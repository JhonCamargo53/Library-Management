import { Request, Response } from "express";
import { borrowBookService, returnBookService } from "../service/BorrowBookService";

export const borrowBook = async (req: Request, res: Response) => {
    try {

        const { userId, bookId } = req.params;

        //Obtener la id del usuario del JWT

        if (await borrowBookService(userId, bookId)) {
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