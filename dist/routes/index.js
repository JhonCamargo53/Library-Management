"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const route_contollers_1 = require("../controllers/route_contollers");
const router = (0, express_1.default)();
router.get('/dishes/list', route_contollers_1.getDishes);
router.post('/dishes/add', route_contollers_1.addDishes);
router.put('/dishes/update', route_contollers_1.updateDishes);
router.delete('/dishes/delete/:id', route_contollers_1.deleteDishes);
exports.default = router;
