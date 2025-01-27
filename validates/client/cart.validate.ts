import { NextFunction, Response } from "express";

// [PATCH] /carts/update
const update = (req: any, res: Response, next: NextFunction) => {
  try {
    const tourId = parseInt(req.body.tourId);
    const quantity = parseInt(req.body.quantity);

    if (
      !tourId ||
      !quantity
    ) {
      req.flash("error", "Có lỗi xảy ra!");
      return res.redirect("back");
    }

    if (quantity < 0) {
      req.flash("error", "Có lỗi xảy ra!");
      return res.redirect("back");
    }

    return next();
  } catch {
    req.flash("error", "Có lỗi xảy ra!");
    return res.redirect("back");
  }
}

// [PATCH] /carts/update
const updateQuantity = (req: any, res: Response, next: NextFunction) => {
  try {
    const tourId = parseInt(req.body.tourId);
    const quantity = parseInt(req.body.quantity);

    if (
      !tourId ||
      !quantity
    ) {
      req.flash("error", "Có lỗi xảy ra!");
      return res.redirect("back");
    }

    if (quantity < 0) {
      req.flash("error", "Có lỗi xảy ra!");
      return res.redirect("back");
    }

    return next();
  } catch {
    req.flash("error", "Có lỗi xảy ra!");
    return res.redirect("back");
  }
}

const cartValidate = {
  update,
  updateQuantity
};
export default cartValidate;