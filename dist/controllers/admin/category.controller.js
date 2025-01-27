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
const index_config_1 = __importDefault(require("../../configs/index.config"));
const category_service_1 = __importDefault(require("../../services/admin/category.service"));
const slug_util_1 = __importDefault(require("../../utils/slug.util"));
// [GET] /admin/categories
const get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield category_service_1.default.findAll({});
        return res.render("admin/pages/category", {
            pageTitle: "Danh Sách Danh Mục",
            categories: categories
        });
    }
    catch (_a) {
        req.flash("error", "Có lỗi xảy ra!");
        return res.redirect("back");
    }
});
// [GET] /admin/categories/detail/:id
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const categoryExists = yield category_service_1.default.findById({ id });
        if (!categoryExists) {
            req.flash("error", "Danh mục không tồn tại!");
            return res.redirect("back");
        }
        return res.render("admin/pages/category/detail.pug", {
            pageTitle: "Chi Tiết Danh Mục",
            category: categoryExists
        });
    }
    catch (_a) {
        req.flash("error", "Có lỗi xảy ra!");
        return res.redirect("back");
    }
});
// [GET] /admin/categories/create
const create = (req, res) => {
    try {
        return res.render("admin/pages/category/create.pug", {
            pageTitle: "Tạo Mới Danh Mục"
        });
    }
    catch (_a) {
        req.flash("error", "Có lỗi xảy ra!");
        return res.redirect("back");
    }
};
// [POST] /admin/categories/create
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const title = req.body.title;
        const image = req.body.image;
        const description = req.body.description;
        const status = req.body.status;
        const position = req.body.position;
        let newSlug = slug_util_1.default.convert(title);
        const categories = yield category_service_1.default.findAllBySlug(newSlug);
        if (categories.length) {
            newSlug += `-${categories.length + 1}`;
        }
        yield category_service_1.default.create({
            category: {
                title,
                image,
                description,
                status,
                position,
                slug: newSlug
            }
        });
        req.flash("success", "Danh mục được tạo thành công!");
        return res.redirect(`/${index_config_1.default.admin}/categories`);
    }
    catch (_a) {
        req.flash("error", "Có lỗi xảy ra!");
        return res.redirect("back");
    }
});
// [GET] /admin/categories/update/:id
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const category = yield category_service_1.default.findById({ id });
        if (!category) {
            req.flash("error", "Danh mục không tồn tại!");
            return res.redirect("back");
        }
        return res.render("admin/pages/category/update.pug", {
            pageTitle: "Cập Nhật Danh Mục",
            category: category
        });
    }
    catch (_a) {
        req.flash("error", "Có lỗi xảy ra!");
        return res.redirect("back");
    }
});
// [PATCH] /admin/categories/update/:id
const updatePatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const title = req.body.title;
        const image = req.body.image;
        const description = req.body.description;
        const status = req.body.status;
        const position = req.body.position;
        const categoryExists = yield category_service_1.default.findById({ id });
        if (!categoryExists) {
            req.flash("Danh mục không tồn tại!");
            return res.redirect("back");
        }
        let newSlug = slug_util_1.default.convert(title);
        const categories = yield category_service_1.default.findAllBySlug(newSlug);
        if (categories.length && title !== categoryExists.title) {
            newSlug += `-${categories.length + 1}`;
        }
        else {
            newSlug = categoryExists.slug;
        }
        yield category_service_1.default.update({
            id,
            category: {
                title,
                image,
                description,
                status,
                position,
                slug: newSlug
            }
        });
        req.flash("success", "Danh mục được cập nhật thành công!");
        return res.redirect("back");
    }
    catch (_a) {
        req.flash("error", "Có lỗi xảy ra!");
        return res.redirect("back");
    }
});
// [PATCH] /admin/categories/updateStatus/:status/:id
const updateStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const status = req.params.status;
        const categoryExists = yield category_service_1.default.findById({ id });
        if (!categoryExists) {
            req.flash("error", "Danh mục không tồn tại!");
            return res.redirect("back");
        }
        yield category_service_1.default.update({
            id,
            category: { status }
        });
        req.flash("success", "Trạng thái được cập nhật thành công!");
        return res.redirect("back");
    }
    catch (e) {
        console.log(e);
        req.flash("error", "Có lỗi xảy ra!");
        return res.redirect("back");
    }
});
// [PATCH] /admin/categories/updatePosition/:position/:id
const updatePosition = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const position = parseInt(req.params.position);
        const categoryExists = yield category_service_1.default.findById({ id });
        if (!categoryExists) {
            req.flash("error", "Danh mục không tồn tại!");
            return res.redirect("back");
        }
        yield category_service_1.default.update({
            id,
            category: { position }
        });
        req.flash("success", "Vị trí được cập nhật thành công!");
        return res.redirect("back");
    }
    catch (_a) {
        req.flash("error", "Có lỗi xảy ra!");
        return res.redirect("back");
    }
});
// [DELETE] /admin/categories/delete/:id
const del = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const categoryExists = yield category_service_1.default.findById({ id });
        if (!categoryExists) {
            req.flash("error", "Danh mục không tồn tại!");
            return res.redirect("back");
        }
        yield category_service_1.default.del({ id });
        req.flash("Danh mục được xóa thành công!");
        return res.redirect("back");
    }
    catch (_a) {
        req.flash("error", "Có lỗi xảy ra!");
        return res.redirect("back");
    }
});
const categoryController = {
    get,
    detail,
    create,
    createPost,
    update,
    updatePatch,
    updateStatus,
    updatePosition,
    del
};
exports.default = categoryController;
