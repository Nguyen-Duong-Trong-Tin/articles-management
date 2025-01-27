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
// [GET] /carts
const get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cart = req.cookies.cart;
        if (!cart) {
            req.flash("error", "Giỏ hàng trống!");
            return res.redirect("back");
        }
        const cartArray = JSON.parse(cart);
        for (const item of cartArray) {
            const tour = yield tour_service_1.default.findById(item.tourId);
            item.tour = tour;
        }
        return res.render("client/pages/cart", {
            pageTitle: "Giỏ Hàng",
            cart: cartArray
        });
    }
    catch (_a) {
        req.flash("error", "Có lỗi xảy ra!");
        return res.redirect("back");
    }
});
// [PATCH] /carts/update
const update = (req, res) => {
    try {
        const tourId = parseInt(req.body.tourId);
        const quantity = parseInt(req.body.quantity);
        const cart = req.cookies.cart;
        if (!cart) {
            res.cookie("cart", JSON.stringify([{ tourId, quantity }]), { maxAge: 1000 * 60 * 60 * 24 * 365 });
            req.flash("success", "Thêm vào giỏ hàng thành công!");
            return res.redirect("back");
        }
        const cartArray = JSON.parse(cart);
        const index = cartArray.findIndex(item => item.tourId === tourId);
        if (index === -1) {
            cartArray.push({ tourId, quantity });
        }
        else {
            cartArray[index].quantity += quantity;
        }
        res.cookie("cart", JSON.stringify(cartArray), { maxAge: 1000 * 60 * 60 * 24 * 365 });
        req.flash("success", "Thêm vào giỏ hàng thành công!");
        return res.redirect("back");
    }
    catch (_a) {
        return req.flash("error", "Có lỗi xảy ra!");
    }
};
// [PATCH] /carts/updateQuantity
const updateQuantity = (req, res) => {
    try {
        const tourId = parseInt(req.body.tourId);
        const quantity = parseInt(req.body.quantity);
        const cart = req.cookies.cart;
        if (!cart) {
            req.flash("error", "Giỏ hàng trống!");
            return res.redirect("back");
        }
        const cartArray = JSON.parse(cart);
        const index = cartArray.findIndex(item => item.tourId === tourId);
        if (index === -1) {
            req.flash("error", "Giỏ hàng trống!");
            return res.redirect("back");
        }
        else {
            cartArray[index].quantity = quantity;
        }
        res.cookie("cart", JSON.stringify(cartArray), { maxAge: 1000 * 60 * 60 * 24 * 365 });
        req.flash("success", "Cập nhật số lượng thành công!");
        return res.redirect("back");
    }
    catch (_a) {
        return req.flash("error", "Có lỗi xảy ra!");
    }
};
// [DELETE] /carts/deleteItem/:tourId
const deleteItem = (req, res) => {
    try {
        const tourId = parseInt(req.params.tourId);
        const cart = req.cookies.cart;
        if (!cart) {
            req.flash("error", "Giỏ hàng trống!");
            return res.redirect("back");
        }
        let cartArray = JSON.parse(cart);
        const index = cartArray.findIndex(item => item.tourId === tourId);
        if (index !== -1) {
            cartArray.splice(index, 1);
        }
        res.cookie("cart", JSON.stringify(cartArray), { maxAge: 1000 * 60 * 60 * 24 * 365 });
        req.flash("success", "Xóa sản phẩm thành công!");
        return res.redirect("back");
    }
    catch (_a) {
        req.flash("error", "Có lỗi xảy ra!");
        return res.redirect("back");
    }
};
const cartController = {
    get,
    update,
    updateQuantity,
    deleteItem
};
exports.default = cartController;
