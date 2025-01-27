import { Response } from "express";

import { ICart, ICartSelect } from "../../interfaces/cart.interface";
import { ITour } from "../../interfaces/tour.interface";

import tourService from "../../services/client/tour.service";

// [GET] /carts
const get = async (req: any, res: Response) => {
  try {
    const cart = req.cookies.cart;
    if (!cart) {
      req.flash("error", "Giỏ hàng trống!");
      return res.redirect("back");
    }

    const cartArray: ICartSelect[] = JSON.parse(cart);
    for (const item of cartArray) {
      const tour = await tourService.findById(item.tourId as number);
      item.tour = tour as ITour;
    }

    return res.render("client/pages/cart", {
      pageTitle: "Giỏ Hàng",
      cart: cartArray
    });
  } catch {
    req.flash("error", "Có lỗi xảy ra!");
    return res.redirect("back");
  }
}

// [PATCH] /carts/update
const update = (req: any, res: Response) => {
  try {
    const tourId = parseInt(req.body.tourId);
    const quantity = parseInt(req.body.quantity);

    const cart = req.cookies.cart;
    if (!cart) {
      res.cookie(
        "cart",
        JSON.stringify([{ tourId, quantity }]),
        { maxAge: 1000 * 60 * 60 * 24 * 365 }
      );

      req.flash("success", "Thêm vào giỏ hàng thành công!");
      return res.redirect("back");
    }

    const cartArray: ICart[] = JSON.parse(cart);
    const index = cartArray.findIndex(item => item.tourId === tourId);

    if (index === -1) {
      cartArray.push({ tourId, quantity });
    } else {
      cartArray[index].quantity += quantity;
    }
    res.cookie(
      "cart",
      JSON.stringify(cartArray),
      { maxAge: 1000 * 60 * 60 * 24 * 365 }
    );

    req.flash("success", "Thêm vào giỏ hàng thành công!");
    return res.redirect("back");
  } catch {
    return req.flash("error", "Có lỗi xảy ra!");
  }
}

// [PATCH] /carts/updateQuantity
const updateQuantity = (req: any, res: Response) => {
  try {
    const tourId = parseInt(req.body.tourId);
    const quantity = parseInt(req.body.quantity);

    const cart = req.cookies.cart;
    if (!cart) {
      req.flash("error", "Giỏ hàng trống!");
      return res.redirect("back");
    }

    const cartArray: ICart[] = JSON.parse(cart);
    const index = cartArray.findIndex(item => item.tourId === tourId);

    if (index === -1) {
      req.flash("error", "Giỏ hàng trống!");
      return res.redirect("back");
    } else {
      cartArray[index].quantity = quantity;
    }
    res.cookie(
      "cart",
      JSON.stringify(cartArray),
      { maxAge: 1000 * 60 * 60 * 24 * 365 }
    );

    req.flash("success", "Cập nhật số lượng thành công!");
    return res.redirect("back");
  } catch {
    return req.flash("error", "Có lỗi xảy ra!");
  }
}

// [DELETE] /carts/deleteItem/:tourId
const deleteItem = (req: any, res: Response) => {
  try {
    const tourId = parseInt(req.params.tourId);

    const cart = req.cookies.cart;
    if (!cart) {
      req.flash("error", "Giỏ hàng trống!");
      return res.redirect("back");
    }

    let cartArray: ICart[] = JSON.parse(cart);
    const index = cartArray.findIndex(item => item.tourId === tourId);
    if (index !== -1) {
      cartArray.splice(index, 1);
    }

    res.cookie(
      "cart",
      JSON.stringify(cartArray),
      { maxAge: 1000 * 60 * 60 * 24 * 365 }
    );

    req.flash("success", "Xóa sản phẩm thành công!");
    return res.redirect("back");
  } catch {
    req.flash("error", "Có lỗi xảy ra!");
    return res.redirect("back");
  }
}

const cartController = {
  get,
  update,
  updateQuantity,
  deleteItem
};
export default cartController;