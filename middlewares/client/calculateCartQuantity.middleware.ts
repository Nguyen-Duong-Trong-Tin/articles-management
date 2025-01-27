import { NextFunction, Response } from "express";

import { ICart } from "../../interfaces/cart.interface";

const calculateCartQuantity = (req: any, res: Response, next: NextFunction) => {
  try {
    const cart = req.cookies.cart;
    if (!cart) {
      res.locals.cartQuantity = 0;
      return next();
    }

    const cartArray: ICart[] = JSON.parse(cart);
    const cartQuantity = cartArray.reduce((total, item) => total + item.quantity, 0);
    res.locals.cartQuantity = cartQuantity;

    return next();
  } catch {
    req.flash("error", "Có lỗi xảy ra!");
    return res.redirect("back");
  }
}

export default calculateCartQuantity;