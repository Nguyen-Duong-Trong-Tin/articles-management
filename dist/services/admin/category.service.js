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
const sequelize_1 = require("sequelize");
const database_config_1 = __importDefault(require("../../configs/database.config"));
const category_model_1 = __importDefault(require("../../models/category.model"));
const findAll = (_a) => __awaiter(void 0, [_a], void 0, function* ({ status }) {
    const find = {};
    if (status) {
        find.status = status;
    }
    const categories = yield category_model_1.default.findAll({
        where: find,
        order: database_config_1.default.literal("position ASC"),
        raw: true
    });
    return categories;
});
const findAllBySlug = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield category_model_1.default.findAll({
        where: {
            slug: { [sequelize_1.Op.like]: `${slug}%` }
        },
        raw: true
    });
    return categories;
});
const findById = (_a) => __awaiter(void 0, [_a], void 0, function* ({ id, status }) {
    const find = { id };
    if (status) {
        find.status = status;
    }
    const category = yield category_model_1.default.findOne({
        where: find,
        raw: true
    });
    return category;
});
const create = (_a) => __awaiter(void 0, [_a], void 0, function* ({ category }) {
    const newCategory = (yield category_model_1.default.create(category)).dataValues;
    return newCategory;
});
const update = (_a) => __awaiter(void 0, [_a], void 0, function* ({ id, category }) {
    yield category_model_1.default.update(category, { where: { id } });
    const newCategory = yield category_model_1.default.findOne({
        where: { id },
        raw: true
    });
    return newCategory;
});
const del = (_a) => __awaiter(void 0, [_a], void 0, function* ({ id, status }) {
    const find = { id };
    if (status) {
        find.status = status;
    }
    const category = yield category_model_1.default.findOne({ where: find });
    if (!category) {
        return null;
    }
    category.destroy();
    return category.dataValues;
});
const categoryService = {
    findAll,
    findAllBySlug,
    findById,
    create,
    update,
    del
};
exports.default = categoryService;
