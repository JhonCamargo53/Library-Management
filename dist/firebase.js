"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("firebase/app"));
require("firebase/firestore");
const firebaseConfig = {
    apiKey: "AIzaSyCpk_UL_FRS3LE_SKg-8C4V6uR75Ukvf38",
    authDomain: "library-management-6f084.firebaseapp.com",
    projectId: "library-management-6f084",
    storageBucket: "library-management-6f084.appspot.com",
    messagingSenderId: "862778297828",
    appId: "1:862778297828:web:7d0ad305fa2bc34f2c8bf1"
};
const database = app_1.default.initializeApp(firebaseConfig).firestore();
exports.default = database;
