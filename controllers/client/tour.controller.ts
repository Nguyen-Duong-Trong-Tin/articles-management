import { Response } from "express";

import tourService from "../../services/client/tour.service";

// [GET] /tours/:slugCategory
const get = async (req: any, res: Response) => {
  try {
    const slugCategory = req.params.slugCategory;

    const tours = await tourService.findBySlugCategory(slugCategory);

    return res.render("client/pages/tour", {
      pageTitle: "Danh Sách Chuyến Đi",
      tours: tours
    });
  } catch {
    req.flash("error", "Có lỗi xảy ra!");
    return res.redirect("back");
  }
}

// [GET] /tours/detail/:slug
const detail = async (req: any, res: Response) => {
  try {
    const slug = req.params.slug;

    const tour = await tourService.findBySlug(slug);

    return res.render("client/pages/tour/detail.pug", {
      pageTitle: "Chi Tiết Chuyến Đi",
      tour: tour
    });
  } catch {
    req.flash("error", "Có lỗi xảy ra!");
    return res.redirect("back");
  }
}

const tourController = {
  get,
  detail
};
export default tourController;