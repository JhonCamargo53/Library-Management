import express from 'express'
import cors from 'cors'
import bookRouter from './routes/BookRoute';
import borrowBookRouter from './routes/BorrowBookRoutes';
import authRouter from './routes/AuthRoutes';

const app = express();
var cookieParser = require('cookie-parser');
require('dotenv').config({ path: '../.env' })
const morgan = require('morgan');
app.use(express.json({ limit: '5mb' }));

app.use(cors({ origin: "*" }))
app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'));

app.use(bookRouter); 
app.use(borrowBookRouter); 
app.use(authRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log("Server on port ", port)
});