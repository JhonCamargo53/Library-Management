"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;
const pg_1 = require("pg");
exports.database = new pg_1.Pool({
    database: 'dishes_control',
    user: 'postgres',
    password: '123456',
    port: 5432,
    host: 'localhost',
});
