import express from "express";

import CategoryController from "@app/controllers/Category.controller";

const categoryRoutes = express.Router();
const categoryController = new CategoryController();

categoryRoutes
  .get("/", (req, res) => categoryController.getCategories(req, res))
  .post("/add", (req, res) => categoryController.addCategory(req, res))
  .delete("/delete/:idCategory", (req, res) =>
    categoryController.deleteCategory(req, res)
  );

export default categoryRoutes;
