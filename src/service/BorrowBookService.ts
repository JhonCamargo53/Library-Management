import database from "../firebase";
import { IBook } from "../interface";
import { changeAvailabilityService, checkBookAvailabilityService } from "./BookService";


export const getUserBorrowsService = async (userId: string) => {

    try {

        const bookIds:any = [];

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

export const returnBookService = async (borrowId: string) => {

    try {

        const borrowDocRef = database.collection('borrows').doc(borrowId);

        const borrowDoc = await borrowDocRef.get();

        if (borrowDoc.exists) {

            const borrowData = borrowDoc.data();
            const borrowBookId = borrowData?.bookId;

            await changeAvailabilityService(borrowBookId, true);
            await borrowDocRef.delete();

            return true;

        } else {

            return false;
        }

    } catch (error) {
        throw error;
    }

}