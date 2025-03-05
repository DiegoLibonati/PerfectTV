import { Request, Response } from "express";

import { responseConstants } from "@app/constants/Response.constants";
import prisma from "@app/database/Prisma.database";

class CategoryController {
  async getCategories(req: Request, res: Response) {
    const categories = await prisma.category.findMany();

    res.status(200).json({
      code: responseConstants.successGetCategories.code,
      message: responseConstants.successGetCategories.message,
      data: categories,
    });
    return;
  }

  async addCategory(req: Request, res: Response) {
    const body = req.body;

    const categoryName = body.name ? body.name.trim() : null;

    if (!categoryName) {
      res.status(400).json({
        code: responseConstants.notValidFields.code,
        message: responseConstants.notValidFields.message,
      });
      return;
    }

    const category = await prisma.category.create({
      data: { name: categoryName },
    });

    res.status(201).json({
      code: responseConstants.successAddCategory.code,
      message: responseConstants.successAddCategory.message,
      data: category,
    });
    return;
  }

  async deleteCategory(req: Request, res: Response) {
    const idCategory = req.params.idCategory;

    if (!idCategory) {
      res.status(400).json({
        code: responseConstants.notValidParams.code,
        message: responseConstants.notValidParams.message,
      });
      return;
    }

    const categoryExists = await prisma.category.findUnique({
      where: { id: Number(idCategory) },
    });

    if (!categoryExists) {
      res.status(404).json({
        code: responseConstants.notFoundCategory.code,
        message: responseConstants.notFoundCategory.message,
      });
      return;
    }

    const categoryDeleted = await prisma.category.delete({
      where: { id: Number(idCategory) },
    });

    res.status(200).json({
      code: responseConstants.successDeleteCategory.code,
      message: responseConstants.successDeleteCategory.message,
      data: categoryDeleted,
    });
    return;
  }
}

export default CategoryController;
