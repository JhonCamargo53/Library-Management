"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const BookRoute_1 = __importDefault(require("./routes/BookRoute"));
const BorrowBookRoutes_1 = __importDefault(require("./routes/BorrowBookRoutes"));
const AuthRoutes_1 = __importDefault(require("./routes/AuthRoutes"));
const app = (0, express_1.default)();
var cookieParser = require('cookie-parser');
require('dotenv').config({ path: './.env' });
const morgan = require('morgan');
app.use(express_1.default.json({ limit: '5mb' }));
app.use((0, cors_1.default)({ origin: "*" }));
app.use(express_1.default.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(BookRoute_1.default);
app.use(BorrowBookRoutes_1.default);
app.use(AuthRoutes_1.default);
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("Server on port ", port);
});
