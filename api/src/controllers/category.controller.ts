import { Request, Response } from "express";

import { getExceptionMessage } from "@src/helpers/get_exception_message.helper";

import {
  MESSAGES_ERROR,
  MESSAGES_NOT,
  MESSAGES_SUCCESS,
} from "@src/constants/messages.constant";
import {
  CODES_ERROR,
  CODES_NOT,
  CODES_SUCCESS,
} from "@src/constants/codes.constant";
import { CategoryService } from "@src/services/category.service";

export const CategoryController = {
  async getCategories(_: Request, res: Response) {
    try {
      const categories = await CategoryService.getAllCategories();

      return res.status(200).json({
        code: CODES_SUCCESS.getCategories,
        message: MESSAGES_SUCCESS.getCategories,
        data: categories,
      });
    } catch (e) {
      const response = getExceptionMessage(e);
      return res.status(500).json(response);
    }
  },
  async addCategory(req: Request, res: Response) {
    try {
      const body = req.body;

      const code = body.code ? body.code.trim() : null;
      const description = body.description ? body.description.trim() : null;

      if (!code || !description) {
        return res.status(400).json({
          code: CODES_NOT.validFields,
          message: MESSAGES_NOT.validFields,
        });
      }

      const categoryExists = await CategoryService.getCategoryByCode(code);

      if (categoryExists) {
        return res.status(400).json({
          code: CODES_ERROR.categoryAlreadyExists,
          message: MESSAGES_ERROR.categoryAlreadyExists,
        });
      }

      const category = await CategoryService.createCategory({
        code: code,
        description: description,
      });

      return res.status(201).json({
        code: CODES_SUCCESS.addCategory,
        message: MESSAGES_SUCCESS.addCategory,
        data: category,
      });
    } catch (e) {
      const response = getExceptionMessage(e);
      return res.status(500).json(response);
    }
  },
  async deleteCategory(req: Request, res: Response) {
    try {
      const idCategory = req.params.id;

      if (!idCategory) {
        return res.status(400).json({
          code: CODES_NOT.validParams,
          message: MESSAGES_NOT.validParams,
        });
      }

      const categoryExists = await CategoryService.getCategoryById(Number(idCategory));

      if (!categoryExists) {
        return res.status(404).json({
          code: CODES_NOT.foundBase,
          message: MESSAGES_NOT.foundBase,
        });
      }

      const categoryDeleted = await CategoryService.deleteCategory(Number(idCategory));

      return res.status(200).json({
        code: CODES_SUCCESS.deleteCategory,
        message: MESSAGES_SUCCESS.deleteCategory,
        data: categoryDeleted,
      });
    } catch (e) {
      const response = getExceptionMessage(e);
      return res.status(500).json(response);
    }
  },
};
