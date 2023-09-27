import database from "../firebase"
import { IBook } from "../interface";

export const getBooksService = async () => {

    try {

        const data = await database.collection('books').get();
        const bookList = data.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return bookList as Array<IBook>;

    } catch (error) {
        console.log(error);
    }

}

export const getAvailableBooksService = async () => {

    try {

        const data = await database.collection('books').where('availability', '==', true).get();
        const bookList = data.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return bookList as Array<IBook>;

    } catch (error) {
        console.log(error);
    }

}

export const addBookService = async (book: IBook) => {

    try {

        return await database.collection('books').add({ ...book, availability: true });

    } catch (error) {
        throw error;
    }
}

export const deleteBookService = async (bookId: string) => {
    try {

        await database.collection('books').doc(bookId).delete();

    } catch (error) {
        throw error;
    }
}

export const updateBookService = async (bookId: string, updatedBook: IBook) => {

    try {

        await database.collection('books').doc(bookId).update({
            title: updatedBook.title,
            owner: updatedBook.owner,
            description: updatedBook.description,
            releaseYear: updatedBook.releaseYear,
            imgUrl: updatedBook.imgUrl
        });

    } catch (error) {
        throw error;
    }
}

export const checkBookAvailabilityService = async (bookId: string) => {

    try {

        const book = await database.collection('books').doc(bookId).get();

        return book.data()?.availability as boolean;

    } catch (error) {
        throw error;
    }

}

export const changeAvailabilityService = async (bookId: string, availability: boolean) => {

    try {

        await database.collection('books').doc(bookId).update({ availability: availability });

    } catch (error) {
        throw error;
    }

}