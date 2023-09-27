import Router from 'express';
import { borrowBook, getUserBorrows, returnBook } from '../controllers/BorrowBookController';
import { verifyToken } from '../middleware/Auth';

const borrowBookRouter = Router();

borrowBookRouter.get('/borrowBook/getUserBorrows', verifyToken, getUserBorrows);
borrowBookRouter.post('/borrowBook/borrowBook/:userId/:bookId', verifyToken, borrowBook);
borrowBookRouter.delete('/borrowBook/returnBook/:bookId', verifyToken, returnBook);


export default borrowBookRouter;