import Router from 'express';
import { borrowBook, returnBook } from '../controllers/BorrowBookController';
import { verifyToken } from '../middleware/Auth';

const borrowBookRouter = Router();

borrowBookRouter.post('/borrowBook/borrowBook/:userId/:bookId', verifyToken, borrowBook);
borrowBookRouter.delete('/borrowBook/returnBook/:borrowId', verifyToken, returnBook);

export default borrowBookRouter;