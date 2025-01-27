import express from "express";
const router = express.Router();

import controller from "../../controllers/admin/dashboard.controller";

router.get("/", controller.get);

export default router;