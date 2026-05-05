import { Router } from "express";

import { TypeController } from "@/controllers/type.controller";

const router = Router();

router.get("/", TypeController.getTypes);
router.post("/", TypeController.addType);
router.delete("/:id", TypeController.deleteType);

export default router;
