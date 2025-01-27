import { Response } from "express";

import configs from "../../configs/index.config";
import categoryService from "../../services/admin/category.service";
import slugUtil from "../../utils/slug.util";

// [GET] /admin/categories
const get = async (req: any, res: Response) => {
  try {
    const categories = await categoryService.findAll({});

    return res.render("admin/pages/category", {
      pageTitle: "Danh Sách Danh Mục",
      categories: categories
    });
  } catch {
    req.flash("error", "Có lỗi xảy ra!");
    return res.redirect("back");
  }
}

// [GET] /admin/categories/detail/:id
const detail = async (req: any, res: Response) => {
  try {
    const id = req.params.id;

    const categoryExists = await categoryService.findById({ id });
    if (!categoryExists) {
      req.flash("error", "Danh mục không tồn tại!");
      return res.redirect("back");
    }

    return res.render("admin/pages/category/detail.pug", {
      pageTitle: "Chi Tiết Danh Mục",
      category: categoryExists
    });
  } catch {
    req.flash("error", "Có lỗi xảy ra!");
    return res.redirect("back");
  }
}

// [GET] /admin/categories/create
const create = (req: any, res: Response) => {
  try {
    return res.render("admin/pages/category/create.pug", {
      pageTitle: "Tạo Mới Danh Mục"
    });
  } catch {
    req.flash("error", "Có lỗi xảy ra!");
    return res.redirect("back");
  }
}

// [POST] /admin/categories/create
const createPost = async (req: any, res: Response) => {
  try {
    const title = req.body.title;
    const image = req.body.image;
    const description = req.body.description;
    const status = req.body.status;
    const position = req.body.position;

    let newSlug = slugUtil.convert(title);
    const categories = await categoryService.findAllBySlug(newSlug);
    if (categories.length) {
      newSlug += `-${categories.length + 1}`;
    }

    await categoryService.create({
      category: {
        title,
        image,
        description,
        status,
        position,
        slug: newSlug
      }
    });

    req.flash("success", "Danh mục được tạo thành công!");
    return res.redirect(`/${configs.admin}/categories`);
  } catch {
    req.flash("error", "Có lỗi xảy ra!");
    return res.redirect("back");
  }
}

// [GET] /admin/categories/update/:id
const update = async (req: any, res: Response) => {
  try {
    const id = req.params.id;

    const category = await categoryService.findById({ id });
    if (!category) {
      req.flash("error", "Danh mục không tồn tại!");
      return res.redirect("back");
    }

    return res.render("admin/pages/category/update.pug", {
      pageTitle: "Cập Nhật Danh Mục",
      category: category
    });
  } catch {
    req.flash("error", "Có lỗi xảy ra!");
    return res.redirect("back");
  }
}

// [PATCH] /admin/categories/update/:id
const updatePatch = async (req: any, res: Response) => {
  try {
    const id = req.params.id;

    const title = req.body.title;
    const image = req.body.image;
    const description = req.body.description;
    const status = req.body.status;
    const position = req.body.position;

    const categoryExists = await categoryService.findById({ id });
    if (!categoryExists) {
      req.flash("Danh mục không tồn tại!");
      return res.redirect("back");
    }

    let newSlug = slugUtil.convert(title);
    const categories = await categoryService.findAllBySlug(newSlug);

    if (categories.length && title !== categoryExists.title) {
      newSlug += `-${categories.length + 1}`;
    } else {
      newSlug = categoryExists.slug;
    }

    await categoryService.update({
      id,
      category: {
        title,
        image,
        description,
        status,
        position,
        slug: newSlug
      }
    });

    req.flash("success", "Danh mục được cập nhật thành công!");
    return res.redirect("back");
  } catch {
    req.flash("error", "Có lỗi xảy ra!");
    return res.redirect("back");
  }
}

// [PATCH] /admin/categories/updateStatus/:status/:id
const updateStatus = async (req: any, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const status = req.params.status;

    const categoryExists = await categoryService.findById({ id });
    if (!categoryExists) {
      req.flash("error", "Danh mục không tồn tại!");
      return res.redirect("back");
    }

    await categoryService.update({
      id,
      category: { status }
    });

    req.flash("success", "Trạng thái được cập nhật thành công!");
    return res.redirect("back");
  } catch (e) {
    console.log(e);

    req.flash("error", "Có lỗi xảy ra!");
    return res.redirect("back");
  }
}

// [PATCH] /admin/categories/updatePosition/:position/:id
const updatePosition = async (req: any, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const position = parseInt(req.params.position);

    const categoryExists = await categoryService.findById({ id });
    if (!categoryExists) {
      req.flash("error", "Danh mục không tồn tại!");
      return res.redirect("back");
    }

    await categoryService.update({
      id,
      category: { position }
    });

    req.flash("success", "Vị trí được cập nhật thành công!");
    return res.redirect("back");
  } catch {
    req.flash("error", "Có lỗi xảy ra!");
    return res.redirect("back");
  }
}

// [DELETE] /admin/categories/delete/:id
const del = async (req: any, res: Response) => {
  try {
    const id = parseInt(req.params.id);

    const categoryExists = await categoryService.findById({ id });
    if (!categoryExists) {
      req.flash("error", "Danh mục không tồn tại!");
      return res.redirect("back");
    }

    await categoryService.del({ id });

    req.flash("Danh mục được xóa thành công!");
    return res.redirect("back");
  } catch {
    req.flash("error", "Có lỗi xảy ra!");
    return res.redirect("back");
  }
}

const categoryController = {
  get,
  detail,
  create,
  createPost,
  update,
  updatePatch,
  updateStatus,
  updatePosition,
  del
};
export default categoryController;