import { Router } from "express";

import { CategoryController } from "@src/controllers/category.controller";

const router = Router();

router.get("/", CategoryController.getCategories);
router.post("/", CategoryController.addCategory);
router.delete("/:id", CategoryController.deleteCategory);

export default router;
