import { Router } from "express";

import { SourceController } from "@src/controllers/source.controller";

const router = Router();

router.get("/", SourceController.getSources);
router.post("/", SourceController.addSource);
router.delete("/:id", SourceController.deleteSource);

export default router;
