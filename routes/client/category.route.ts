import express from "express";
const router = express.Router();

import controller from "../../controllers/client/category.controller";

router.get("/", controller.get);

export default router;