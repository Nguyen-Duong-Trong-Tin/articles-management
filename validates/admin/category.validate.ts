import { NextFunction, Response } from "express";

// [POST] /admin/categories/create
const createPost = (req: any, res: Response, next: NextFunction) => {
  try {
    const title = req.body.title;
    const image = req.body.image;
    const description = req.body.description;
    const status = req.body.status;
    const position = parseInt(req.body.position);

    if (
      !title ||
      !image ||
      !description ||
      !status ||
      !position
    ) {
      req.flash("error", "Thông tin không đầy đủ!");
      return res.redirect("back");
    }

    if (
      typeof title !== "string" ||
      typeof image !== "string" ||
      typeof description !== "string" ||
      typeof status !== "string" ||
      typeof position !== "number"
    ) {
      req.flash("error", "Kiểu dữ liệu không chính xác!");
      return res.redirect("back");
    }

    if (position < 1) {
      req.flash("error", "Vị trí không chính xác!");
      return res.redirect("back");
    }

    return next();
  } catch {
    req.flash("error", "Có lỗi xảy ra!");
    return res.redirect("back");
  }
}

// [PATCH] /admin/categories/update/:id
const updatePatch = (req: any, res: Response, next: NextFunction) => {
  try {
    const title = req.body.title;
    const image = req.body.image;
    const description = req.body.description;
    const status = req.body.status;
    const position = parseInt(req.body.position);

    if (
      !title ||
      !image ||
      !description ||
      !status ||
      !position
    ) {
      req.flash("error", "Thông tin không đầy đủ!");
      return res.redirect("back");
    }

    if (
      typeof title !== "string" ||
      typeof image !== "string" ||
      typeof description !== "string" ||
      typeof status !== "string" ||
      typeof position !== "number"
    ) {
      req.flash("error", "Kiểu dữ liệu không chính xác!");
      return res.redirect("back");
    }

    if (position < 1) {
      req.flash("error", "Vị trí không chính xác!");
      return res.redirect("back");
    }

    return next();
  } catch {
    req.flash("error", "Có lỗi xảy ra!");
    return res.redirect("back");
  }
}

const categoryValidate = {
  createPost,
  updatePatch
};
export default categoryValidate;