import { RequestHandler, Router } from "express";

import { SourceController } from "@src/controllers/source.controller";

const router = Router();

router.get("/", SourceController.getSources as RequestHandler);
router.post("/", SourceController.addSource as RequestHandler);
router.delete("/:id", SourceController.deleteSource as RequestHandler);

export default router;
