import { RequestHandler, Router } from "express";

import { TypeController } from "@src/controllers/type.controller";

const router = Router();

router.get("/", TypeController.getTypes as RequestHandler);
router.post("/", TypeController.addType as RequestHandler);
router.delete("/:id", TypeController.deleteType as RequestHandler);

export default router;
