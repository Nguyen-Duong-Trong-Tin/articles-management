import express from "express";
const router = express.Router();

import controller from "../../controllers/client/tour.controller"

router.get("/:slugCategory", controller.get);
router.get("/detail/:slug", controller.detail);

export default router;