import type { Request, Response } from "express";
import type { CategoryCreatePayload } from "@/types/payloads";

import { CategoryService } from "@/services/category.service";

import { getExceptionMessage } from "@/helpers/get_exception_message.helper";

import { MESSAGES_ERROR, MESSAGES_NOT, MESSAGES_SUCCESS } from "@/constants/messages.constant";
import { CODES_ERROR, CODES_NOT, CODES_SUCCESS } from "@/constants/codes.constant";

export const CategoryController = {
  getCategories: async (_: Request, res: Response): Promise<void> => {
    try {
      const categories = await CategoryService.getAllCategories();

      res.status(200).json({
        code: CODES_SUCCESS.getCategories,
        message: MESSAGES_SUCCESS.getCategories,
        data: categories,
      });
    } catch (e) {
      const { status, ...response } = getExceptionMessage(e);
      res.status(status).json(response);
    }
  },

  addCategory: async (
    req: Request<object, object, Partial<CategoryCreatePayload>>,
    res: Response
  ): Promise<void> => {
    try {
      const { code: rawCode, description: rawDescription } = req.body;

      const code = rawCode ? rawCode.trim() : null;
      const description = rawDescription ? rawDescription.trim() : null;

      if (!code || !description) {
        res.status(400).json({
          code: CODES_NOT.validFields,
          message: MESSAGES_NOT.validFields,
        });
        return;
      }

      const categoryExists = await CategoryService.getCategoryByCode(code);

      if (categoryExists) {
        res.status(400).json({
          code: CODES_ERROR.categoryAlreadyExists,
          message: MESSAGES_ERROR.categoryAlreadyExists,
        });
        return;
      }

      const category = await CategoryService.createCategory({ code, description });

      res.status(201).json({
        code: CODES_SUCCESS.addCategory,
        message: MESSAGES_SUCCESS.addCategory,
        data: category,
      });
    } catch (e) {
      const { status, ...response } = getExceptionMessage(e);
      res.status(status).json(response);
    }
  },

  deleteCategory: async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    try {
      const idCategory = req.params.id;

      if (!idCategory) {
        res.status(400).json({
          code: CODES_NOT.validParams,
          message: MESSAGES_NOT.validParams,
        });
        return;
      }

      const categoryExists = await CategoryService.getCategoryById(Number(idCategory));

      if (!categoryExists) {
        res.status(404).json({
          code: CODES_NOT.foundCategory,
          message: MESSAGES_NOT.foundCategory,
        });
        return;
      }

      const categoryDeleted = await CategoryService.deleteCategory(Number(idCategory));

      res.status(200).json({
        code: CODES_SUCCESS.deleteCategory,
        message: MESSAGES_SUCCESS.deleteCategory,
        data: categoryDeleted,
      });
    } catch (e) {
      const { status, ...response } = getExceptionMessage(e);
      res.status(status).json(response);
    }
  },
};
