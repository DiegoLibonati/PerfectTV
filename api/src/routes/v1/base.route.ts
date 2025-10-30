import { RequestHandler, Router } from "express";

import { BaseController } from "@src/controllers/base.controller";

const router = Router();

router.get("/", BaseController.getBases as RequestHandler);
router.post("/", BaseController.addBase as RequestHandler);
router.patch("/:id", BaseController.updateBase as RequestHandler);
router.delete("/:id", BaseController.deleteBase as RequestHandler);

export default router;
