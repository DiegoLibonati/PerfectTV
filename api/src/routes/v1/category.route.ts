import { RequestHandler, Router } from "express";

import { CategoryController } from "@src/controllers/category.controller";

const router = Router();

router.get("/", CategoryController.getCategories as RequestHandler);
router.post("/", CategoryController.addCategory as RequestHandler);
router.delete("/:id", CategoryController.deleteCategory as RequestHandler);

export default router;
