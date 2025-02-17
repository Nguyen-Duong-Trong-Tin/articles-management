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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const category_service_1 = __importDefault(require("../../services/client/category.service"));
// [GET] /api/v1/categories/get
const get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield category_service_1.default.findAll();
        return res.render("client/pages/category", {
            pageTitle: "Danh Sách Danh Mục Chuyến Đi",
            categories: categories
        });
    }
    catch (_a) {
        req.flash("error", "Có lỗi xảy ra!");
        return res.redirect("back");
    }
});
const categoryController = {
    get
};
exports.default = categoryController;
