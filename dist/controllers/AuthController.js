"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = exports.loginUser = void 0;
const AuthService_1 = require("../service/AuthService");
const UserService_1 = require("../service/UserService");
const Auth_1 = require("../helpers/Auth");
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const userResult = yield (0, AuthService_1.loginUserService)(email, password);
        const user = yield (0, UserService_1.getUserValuesByUIDService)(userResult === null || userResult === void 0 ? void 0 : userResult.uid);
        const token = (0, Auth_1.generateToken)(JSON.stringify(user));
        res.status(201).json({ message: 'Inicio de sesión exitoso', user, token });
    }
    catch (error) {
        console.log(error);
        res.status(400).send('Error al iniciar sesión' + error);
    }
});
exports.loginUser = loginUser;
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req.body;
    const { firstName, lastName, email, password } = user;
    console.log(firstName, lastName, email, password);
    try {
        if (firstName && lastName && email && password) {
            const user = yield (0, AuthService_1.registerUserService)(email, password);
            yield (0, UserService_1.addUserService)(user === null || user === void 0 ? void 0 : user.uid, {
                role: 2,
                firstName: firstName,
                lastName: lastName,
                email: email
            });
            res.status(201).json({ message: 'Inicio de sesión exitoso', user });
        }
        else {
            res.status(500).send("Completa toda la información del usuario para completar el registro.");
        }
    }
    catch (error) {
        console.log(error);
        res.status(400).send('Error al registrar usuario' + error);
    }
});
exports.registerUser = registerUser;
