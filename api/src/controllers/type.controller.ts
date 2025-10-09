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

import { TypeService } from "@src/services/type.service";

export const TypeController = {
  async getTypes(_: Request, res: Response) {
    try {
      const types = await TypeService.getAllTypes();

      return res.status(200).json({
        code: CODES_SUCCESS.getTypes,
        message: MESSAGES_SUCCESS.getTypes,
        data: types,
      });
    } catch (e) {
      const response = getExceptionMessage(e);
      return res.status(500).json(response);
    }
  },

  async addType(req: Request, res: Response) {
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

      const typeExists = await TypeService.getTypeByCode(code);

      if (typeExists) {
        return res.status(400).json({
          code: CODES_ERROR.typeAlreadyExists,
          message: MESSAGES_ERROR.typeAlreadyExists,
        });
      }

      const type = await TypeService.createType({
        code: code,
        description: description,
      });

      return res.status(201).json({
        code: CODES_SUCCESS.addType,
        message: MESSAGES_SUCCESS.addType,
        data: type,
      });
    } catch (e) {
      const response = getExceptionMessage(e);
      return res.status(500).json(response);
    }
  },

  async deleteType(req: Request, res: Response) {
    try {
      const idType = req.params.id;

      if (!idType) {
        return res.status(400).json({
          code: CODES_NOT.validParams,
          message: MESSAGES_NOT.validParams,
        });
      }

      const typeExists = await TypeService.getTypeById(Number(idType));

      if (!typeExists) {
        return res.status(400).json({
          code: CODES_NOT.foundType,
          message: MESSAGES_NOT.foundType,
        });
      }

      const typeDeleted = await TypeService.deleteType(Number(idType));

      return res.status(200).json({
        code: CODES_SUCCESS.deleteType,
        message: MESSAGES_SUCCESS.deleteType,
        data: typeDeleted,
      });
    } catch (e) {
      const response = getExceptionMessage(e);
      return res.status(500).json(response);
    }
  },
};
