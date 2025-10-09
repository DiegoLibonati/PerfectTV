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
import { BaseService } from "@src/services/base.service";

export const BaseController = {
  async getBases(_: Request, res: Response) {
    try {
      const bases = await BaseService.getAllBases();

      return res.status(200).json({
        code: CODES_SUCCESS.getBases,
        message: MESSAGES_SUCCESS.getBases,
        data: bases,
      });
    } catch (e) {
      const response = getExceptionMessage(e);
      return res.status(500).json(response);
    }
  },
  async addBase(req: Request, res: Response) {
    try {
      const body = req.body;

      const baseUrl = body.baseUrl ? body.baseUrl.trim() : null;
      const idSource = body.idSource;

      if (!baseUrl || !idSource) {
        return res.status(400).json({
          code: CODES_NOT.validFields,
          message: MESSAGES_NOT.validFields,
        });
      }

      console.log(idSource)
      const baseExists = await BaseService.getBaseByIdSource(idSource);
      console.log(baseExists)

      if (baseExists) {
        return res.status(400).json({
          code: CODES_ERROR.baseAlreadyExists,
          message: MESSAGES_ERROR.baseAlreadyExists,
        });
      }

      const base = await BaseService.createBase({
        baseUrl: baseUrl,
        idSource: idSource,
      });

      return res.status(201).json({
        code: CODES_SUCCESS.addBase,
        message: MESSAGES_SUCCESS.addBase,
        data: base,
      });
    } catch (e) {
      const response = getExceptionMessage(e);
      return res.status(500).json(response);
    }
  },
  async updateBase(req: Request, res: Response) {
    try {
      const idBase = req.params.id;
      const body = req.body;

      if (!idBase) {
        return res.status(400).json({
          code: CODES_NOT.validParams,
          message: MESSAGES_NOT.validParams,
        });
      }

      const baseExists = await BaseService.getBaseById(Number(idBase));

      if (!baseExists) {
        return res.status(404).json({
          code: CODES_NOT.foundBase,
          message: MESSAGES_NOT.foundBase,
        });
      }

      const baseUrl = body.baseUrl ? body.baseUrl.trim() : null;
      const idSource = body.idSource;

      const data = {
        ...(baseUrl && { baseUrl: baseUrl }),
        ...(idSource !== undefined && { idSource: idSource }),
      };

      const baseUpdated = await BaseService.updateBase(Number(idBase), data);

      return res.status(200).json({
        code: CODES_SUCCESS.updateBase,
        message: MESSAGES_SUCCESS.updateBase,
        data: baseUpdated,
      });
    } catch (e) {
      const response = getExceptionMessage(e);
      return res.status(500).json(response);
    }
  },
  async deleteBase(req: Request, res: Response) {
    try {
      const idBase = req.params.id;

      if (!idBase) {
        return res.status(400).json({
          code: CODES_NOT.validParams,
          message: MESSAGES_NOT.validParams,
        });
      }

      const baseExists = await BaseService.getBaseById(Number(idBase));

      if (!baseExists) {
        return res.status(404).json({
          code: CODES_NOT.foundBase,
          message: MESSAGES_NOT.foundBase,
        });
      }

      const baseDeleted = await BaseService.deleteBase(Number(idBase));

      return res.status(200).json({
        code: CODES_SUCCESS.deleteBase,
        message: MESSAGES_SUCCESS.deleteBase,
        data: baseDeleted,
      });
    } catch (e) {
      const response = getExceptionMessage(e);
      return res.status(500).json(response);
    }
  },
};
