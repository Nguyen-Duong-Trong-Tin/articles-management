"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const category_validate_1 = __importDefault(require("../../validates/admin/category.validate"));
const category_controller_1 = __importDefault(require("../../controllers/admin/category.controller"));
router.get("/", category_controller_1.default.get);
router.get("/detail/:id", category_controller_1.default.detail);
router.get("/create", category_controller_1.default.create);
router.post("/create", category_validate_1.default.createPost, category_controller_1.default.createPost);
router.get("/update/:id", category_controller_1.default.update);
router.patch("/update/:id", category_validate_1.default.updatePatch, category_controller_1.default.updatePatch);
router.patch("/updateStatus/:status/:id", category_controller_1.default.updateStatus);
router.patch("/updatePosition/:position/:id", category_controller_1.default.updatePosition);
router.delete("/delete/:id", category_controller_1.default.del);
exports.default = router;
