import Router from 'express';
import { addBook, deleteBook, getBooks, updateBook } from '../controllers/BookController';
import { verifyAdminToken, verifyToken } from '../middleware/Auth';

const bookRouter = Router();


bookRouter.get('/book/getBooks', verifyToken, getBooks);
bookRouter.post('/book/addBook', verifyAdminToken, addBook);
bookRouter.put('/book/updateBook', verifyAdminToken, updateBook);
bookRouter.delete('/book/deleteBook/:bookId', verifyAdminToken, deleteBook);

export default bookRouter;