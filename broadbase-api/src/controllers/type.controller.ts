import type { Request, Response } from "express";
import type { TypeCreatePayload } from "@/types/payloads";

import { TypeService } from "@/services/type.service";

import { getExceptionMessage } from "@/helpers/get_exception_message.helper";

import { MESSAGES_ERROR, MESSAGES_NOT, MESSAGES_SUCCESS } from "@/constants/messages.constant";
import { CODES_ERROR, CODES_NOT, CODES_SUCCESS } from "@/constants/codes.constant";

export const TypeController = {
  getTypes: async (_: Request, res: Response): Promise<void> => {
    try {
      const types = await TypeService.getAllTypes();

      res.status(200).json({
        code: CODES_SUCCESS.getTypes,
        message: MESSAGES_SUCCESS.getTypes,
        data: types,
      });
    } catch (e) {
      const { status, ...response } = getExceptionMessage(e);
      res.status(status).json(response);
    }
  },

  addType: async (
    req: Request<object, object, Partial<TypeCreatePayload>>,
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

      const typeExists = await TypeService.getTypeByCode(code);

      if (typeExists) {
        res.status(400).json({
          code: CODES_ERROR.typeAlreadyExists,
          message: MESSAGES_ERROR.typeAlreadyExists,
        });
        return;
      }

      const type = await TypeService.createType({ code, description });

      res.status(201).json({
        code: CODES_SUCCESS.addType,
        message: MESSAGES_SUCCESS.addType,
        data: type,
      });
    } catch (e) {
      const { status, ...response } = getExceptionMessage(e);
      res.status(status).json(response);
    }
  },

  deleteType: async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    try {
      const idType = req.params.id;

      if (!idType) {
        res.status(400).json({
          code: CODES_NOT.validParams,
          message: MESSAGES_NOT.validParams,
        });
        return;
      }

      const typeExists = await TypeService.getTypeById(Number(idType));

      if (!typeExists) {
        res.status(404).json({
          code: CODES_NOT.foundType,
          message: MESSAGES_NOT.foundType,
        });
        return;
      }

      const typeDeleted = await TypeService.deleteType(Number(idType));

      res.status(200).json({
        code: CODES_SUCCESS.deleteType,
        message: MESSAGES_SUCCESS.deleteType,
        data: typeDeleted,
      });
    } catch (e) {
      const { status, ...response } = getExceptionMessage(e);
      res.status(status).json(response);
    }
  },
};
