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
const tour_service_1 = __importDefault(require("../../services/client/tour.service"));
// [GET] /tours/:slugCategory
const get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const slugCategory = req.params.slugCategory;
        const tours = yield tour_service_1.default.findBySlugCategory(slugCategory);
        return res.render("client/pages/tour", {
            pageTitle: "Danh Sách Chuyến Đi",
            tours: tours
        });
    }
    catch (_a) {
        req.flash("error", "Có lỗi xảy ra!");
        return res.redirect("back");
    }
});
// [GET] /tours/detail/:slug
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const slug = req.params.slug;
        const tour = yield tour_service_1.default.findBySlug(slug);
        return res.render("client/pages/tour/detail.pug", {
            pageTitle: "Chi Tiết Chuyến Đi",
            tour: tour
        });
    }
    catch (_a) {
        req.flash("error", "Có lỗi xảy ra!");
        return res.redirect("back");
    }
});
const tourController = {
    get,
    detail
};
exports.default = tourController;
