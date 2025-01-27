import { Express } from "express";

import calculateCartQuantity from "../../middlewares/client/calculateCartQuantity.middleware";

import homeRoutes from "./home.route";
import categoryRoutes from "./category.route";
import tourRoutes from "./tour.route";
import cartRoutes from "./cart.route";

const clientRoutes = (app: Express) => {
  app.use(calculateCartQuantity);

  app.use("/", homeRoutes);
  app.use("/categories", categoryRoutes);
  app.use("/tours", tourRoutes);
  app.use("/carts", cartRoutes);
}

export default clientRoutes;