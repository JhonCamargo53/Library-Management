import database from "../firebase";
import { changeAvailabilityService, checkBookAvailabilityService } from "./BookService";

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

            await changeAvailabilityService(borrowBookId ,true);
            await borrowDocRef.delete();
            
            return true;

        } else {
            
           return false;
        }

    } catch (error) {
        throw error;
    }

}