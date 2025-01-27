import express from "express";
const router = express.Router();

import controller from "../../controllers/client/home.controller";

router.get("/", controller.get);

export default  router;