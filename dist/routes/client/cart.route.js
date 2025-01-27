"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const cart_validate_1 = __importDefault(require("../../validates/client/cart.validate"));
const cart_controller_1 = __importDefault(require("../../controllers/client/cart.controller"));
router.get("/", cart_controller_1.default.get);
router.patch("/update", cart_validate_1.default.update, cart_controller_1.default.update);
router.patch("/updateQuantity", cart_validate_1.default.updateQuantity, cart_controller_1.default.updateQuantity);
router.delete("/deleteItem/:tourId", cart_controller_1.default.deleteItem);
exports.default = router;
