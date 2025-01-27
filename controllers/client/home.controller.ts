import { Response } from "express";

// [GET] /
const get = async (req: any, res: Response) => {
  try {
    return res.render("client/pages/home", {
      pageTitle: "Trang Chủ"
    });
  } catch {
    req.flash("error", "Có lỗi xảy ra!");
    return res.redirect("back");
  }
}

const homeController = {
  get
};
export default homeController;