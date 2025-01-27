import express from "express";
const router = express.Router();

import validate from "../../validates/admin/category.validate";
import controller from "../../controllers/admin/category.controller";

router.get("/", controller.get);
router.get("/detail/:id", controller.detail);

router.get("/create", controller.create);
router.post(
  "/create", 
  validate.createPost,
  controller.createPost
);

router.get("/update/:id", controller.update);
router.patch(
  "/update/:id",
  validate.updatePatch,
  controller.updatePatch
);

router.patch("/updateStatus/:status/:id", controller.updateStatus);
router.patch("/updatePosition/:position/:id", controller.updatePosition);

router.delete("/delete/:id", controller.del);

export default router;