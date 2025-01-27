import express from "express";
const router = express.Router();

import validate from "../../validates/client/cart.validate";
import controller from "../../controllers/client/cart.controller";

router.get("/", controller.get);

router.patch(
  "/update",
  validate.update,
  controller.update
);
router.patch(
  "/updateQuantity",
  validate.updateQuantity,
  controller.updateQuantity
);

router.delete("/deleteItem/:tourId", controller.deleteItem);

export default router;