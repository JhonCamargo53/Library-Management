import database from "../firebase";
import { IBook } from "../interface";
import { changeAvailabilityService, checkBookAvailabilityService } from "./BookService";


export const getUserBorrowsService = async (userId: string) => {

    try {

        const bookIds: any = [];

        const borrowsQuery = await database.collection('borrows').where('userId', '==', userId).get();
        borrowsQuery.forEach(borrowDoc => {
            bookIds.push(borrowDoc.data().bookId);
        });

        const books = [];

        for (const bookId of bookIds) {
            const bookDoc = await database.collection('books').doc(bookId).get();
            if (bookDoc.exists) {
                books.push({ id: bookDoc.id, ...bookDoc.data() });
            }
        }

        return books as Array<IBook>;

    } catch (error) {
        throw error;
    }

}

export const borrowBookService = async (userId: string, bookId: string) => {

    try {

        console.log(await checkBookAvailabilityService(bookId))

        if (await checkBookAvailabilityService(bookId)) {

            await database.collection('borrows').add({
                userId,
                bookId,
            });

            await changeAvailabilityService(bookId, false)

            return true;

        } else {

            return false;
        }

    } catch (error) {
        throw error;
    }

}

export const returnBookService = async (bookId: string, userId: string) => {

    try {

        const borrowsQuery = await database.collection('borrows').where('bookId', '==', bookId).get();

        borrowsQuery.forEach(async (doc) => {

            const borrowData = doc.data();

            if (borrowData.userId === userId) {
                // Elimina el registro de borrows
                await database.collection('borrows').doc(doc.id).delete();

                // Cambia la disponibilidad del libro a true
                await changeAvailabilityService(bookId, true);

            } else {
                throw ('El usuario con ID' + userId + 'no tiene permiso para devolver este libro.');
            }
        });

    } catch (error) {
        throw error;
    }

}