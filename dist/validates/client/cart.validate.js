"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// [PATCH] /carts/update
const update = (req, res, next) => {
    try {
        const tourId = parseInt(req.body.tourId);
        const quantity = parseInt(req.body.quantity);
        if (!tourId ||
            !quantity) {
            req.flash("error", "Có lỗi xảy ra!");
            return res.redirect("back");
        }
        if (quantity < 0) {
            req.flash("error", "Có lỗi xảy ra!");
            return res.redirect("back");
        }
        return next();
    }
    catch (_a) {
        req.flash("error", "Có lỗi xảy ra!");
        return res.redirect("back");
    }
};
// [PATCH] /carts/update
const updateQuantity = (req, res, next) => {
    try {
        const tourId = parseInt(req.body.tourId);
        const quantity = parseInt(req.body.quantity);
        if (!tourId ||
            !quantity) {
            req.flash("error", "Có lỗi xảy ra!");
            return res.redirect("back");
        }
        if (quantity < 0) {
            req.flash("error", "Có lỗi xảy ra!");
            return res.redirect("back");
        }
        return next();
    }
    catch (_a) {
        req.flash("error", "Có lỗi xảy ra!");
        return res.redirect("back");
    }
};
const cartValidate = {
    update,
    updateQuantity
};
exports.default = cartValidate;
