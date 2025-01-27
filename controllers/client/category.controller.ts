import { Response } from "express";

import categoryService from "../../services/client/category.service";

// [GET] /api/v1/categories/get
const get = async (req: any, res: Response) => {
  try {
    const categories = await categoryService.findAll();
    return res.render("client/pages/category", {
      pageTitle: "Danh Sách Danh Mục Chuyến Đi",
      categories: categories
    });
  } catch {
    req.flash("error", "Có lỗi xảy ra!");
    return res.redirect("back");
  }
}

const categoryController = {
  get
};
export default categoryController;