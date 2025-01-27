"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const calculateCartQuantity = (req, res, next) => {
    try {
        const cart = req.cookies.cart;
        if (!cart) {
            res.locals.cartQuantity = 0;
            return next();
        }
        const cartArray = JSON.parse(cart);
        const cartQuantity = cartArray.reduce((total, item) => total + item.quantity, 0);
        res.locals.cartQuantity = cartQuantity;
        return next();
    }
    catch (_a) {
        req.flash("error", "Có lỗi xảy ra!");
        return res.redirect("back");
    }
};
exports.default = calculateCartQuantity;
