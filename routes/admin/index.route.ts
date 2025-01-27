import { Express } from "express";

import configs from "../../configs/index.config";

import adminVariable from "../../middlewares/admin/admin.middleware";

import dashBoardRoutes from "./dashboard.route";
import categoryRoutes from "./category.route";

const adminRoutes = (app: Express) => {
  const admin = configs.admin;

  app.use(adminVariable);

  app.use(`/${admin}/dashboards`, dashBoardRoutes);
  app.use(`/${admin}/categories`, categoryRoutes);
}

export default adminRoutes;