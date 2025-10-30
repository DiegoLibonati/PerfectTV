import { Router } from "express";

import { BaseController } from "@src/controllers/base.controller";

const router = Router();

router.get("/", BaseController.getBases);
router.post("/", BaseController.addBase);
router.patch("/:id", BaseController.updateBase);
router.delete("/:id", BaseController.deleteBase);

export default router;
