"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const tour_controller_1 = __importDefault(require("../../controllers/client/tour.controller"));
router.get("/:slugCategory", tour_controller_1.default.get);
router.get("/detail/:slug", tour_controller_1.default.detail);
exports.default = router;
