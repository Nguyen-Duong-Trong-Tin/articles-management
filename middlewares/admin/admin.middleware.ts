import { NextFunction, Response } from "express";

import configs from "../../configs/index.config";

const adminVariable = (req: any, res: Response, next: NextFunction) => {
  try {
    res.locals.admin = configs.admin;
    return next();
  } catch {
    req.flash("error", "Có lỗi xảy ra!");
    return res.redirect("back");
  }
}

export default adminVariable;