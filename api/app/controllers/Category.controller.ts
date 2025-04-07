import { Request, Response } from "express";

import {
  responseSuccess,
  responseNotFound,
  responseAlreadyExists,
  responseNotValid,
} from "@app/constants/Response.constants";
import categoryRepository from "@app/models/dataAccess/CategoryRepository.model";

class CategoryController {
  async getCategories(req: Request, res: Response) {
    const categories = await categoryRepository.getCategories();

    res.status(200).json({
      code: responseSuccess.getCategories.code,
      data: categories,
    });
    return;
  }

  async addCategory(req: Request, res: Response) {
    const body = req.body;

    const code = body.code ? body.code.trim() : null;
    const description = body.description ? body.description.trim() : null;

    if (!code || !description) {
      res.status(400).json({
        code: responseNotValid.fields.code,
      });
      return;
    }

    const categoryExists = await categoryRepository.getCategoryByCode(code);

    if (categoryExists) {
      res.status(400).json({
        code: responseAlreadyExists.category.code,
      });
      return;
    }

    const category = await categoryRepository.createCategory(code, description);

    res.status(201).json({
      code: responseSuccess.addCategory.code,
      data: category,
    });
    return;
  }

  async deleteCategory(req: Request, res: Response) {
    const idCategory = req.params.idCategory;

    if (!idCategory) {
      res.status(400).json({
        code: responseNotValid.params.code,
      });
      return;
    }

    const categoryExists = await categoryRepository.getCategoryById(
      Number(idCategory)
    );

    if (!categoryExists) {
      res.status(404).json({
        code: responseNotFound.category.code,
      });
      return;
    }

    const categoryDeleted = await categoryRepository.deleteCategory(
      Number(idCategory)
    );

    res.status(200).json({
      code: responseSuccess.deleteCategory.code,
      data: categoryDeleted,
    });
    return;
  }
}

export default CategoryController;
