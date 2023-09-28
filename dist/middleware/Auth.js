"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAdminToken = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.replace("Bearer", "").trim();
        if (!token)
            return res.status(401).send('Se requiere un token de acceso');
        jsonwebtoken_1.default.verify(token, process.env.JWTKEY || 'NOT TOKEN USED', (error, _decode) => {
            console.log(error + " ");
            if (error)
                return res.status(401).send('Token no valido');
            return next();
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).send('Error al validar credenciales');
    }
};
exports.verifyToken = verifyToken;
const verifyAdminToken = (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.replace("Bearer", "").trim();
        if (!token)
            return res.status(401).send('Se requiere un token de acceso');
        const validatedToken = jsonwebtoken_1.default.verify(token, process.env.JWTKEY || 'NOT TOKEN USED');
        const { role } = JSON.parse(validatedToken.user);
        if (role !== 0)
            return res.status(401).send('Token no valido - No cuentas con los permisos necesarios');
        return next();
    }
    catch (error) {
        console.log(error + " ");
        return res.status(40).send('Error al validar credenciales' + error);
    }
};
exports.verifyAdminToken = verifyAdminToken;
