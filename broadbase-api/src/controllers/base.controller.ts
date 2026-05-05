import type { Request, Response } from "express";
import type { BaseCreatePayload, BaseUpdatePayload } from "@/types/payloads";

import { BaseService } from "@/services/base.service";

import { getExceptionMessage } from "@/helpers/get_exception_message.helper";

import { MESSAGES_ERROR, MESSAGES_NOT, MESSAGES_SUCCESS } from "@/constants/messages.constant";
import { CODES_ERROR, CODES_NOT, CODES_SUCCESS } from "@/constants/codes.constant";

export const BaseController = {
  getBases: async (_: Request, res: Response): Promise<void> => {
    try {
      const bases = await BaseService.getAllBases();

      res.status(200).json({
        code: CODES_SUCCESS.getBases,
        message: MESSAGES_SUCCESS.getBases,
        data: bases,
      });
    } catch (e) {
      const { status, ...response } = getExceptionMessage(e);
      res.status(status).json(response);
    }
  },

  addBase: async (
    req: Request<object, object, Partial<BaseCreatePayload>>,
    res: Response
  ): Promise<void> => {
    try {
      const { baseUrl: rawBaseUrl, idSource } = req.body;

      const baseUrl = rawBaseUrl ? rawBaseUrl.trim() : null;

      if (!baseUrl || !idSource) {
        res.status(400).json({
          code: CODES_NOT.validFields,
          message: MESSAGES_NOT.validFields,
        });
        return;
      }

      const baseExists = await BaseService.getBaseByIdSource(idSource);

      if (baseExists) {
        res.status(400).json({
          code: CODES_ERROR.baseAlreadyExists,
          message: MESSAGES_ERROR.baseAlreadyExists,
        });
        return;
      }

      const base = await BaseService.createBase({ baseUrl, idSource });

      res.status(201).json({
        code: CODES_SUCCESS.addBase,
        message: MESSAGES_SUCCESS.addBase,
        data: base,
      });
    } catch (e) {
      const { status, ...response } = getExceptionMessage(e);
      res.status(status).json(response);
    }
  },

  updateBase: async (
    req: Request<{ id: string }, object, BaseUpdatePayload>,
    res: Response
  ): Promise<void> => {
    try {
      const idBase = req.params.id;

      if (!idBase) {
        res.status(400).json({
          code: CODES_NOT.validParams,
          message: MESSAGES_NOT.validParams,
        });
        return;
      }

      const baseExists = await BaseService.getBaseById(Number(idBase));

      if (!baseExists) {
        res.status(404).json({
          code: CODES_NOT.foundBase,
          message: MESSAGES_NOT.foundBase,
        });
        return;
      }

      const { baseUrl: rawBaseUrl, idSource } = req.body;
      const baseUrl = rawBaseUrl ? rawBaseUrl.trim() : null;

      const data = {
        ...(baseUrl && { baseUrl }),
        ...(idSource !== undefined && { idSource }),
      };

      const baseUpdated = await BaseService.updateBase(Number(idBase), data);

      res.status(200).json({
        code: CODES_SUCCESS.updateBase,
        message: MESSAGES_SUCCESS.updateBase,
        data: baseUpdated,
      });
    } catch (e) {
      const { status, ...response } = getExceptionMessage(e);
      res.status(status).json(response);
    }
  },

  deleteBase: async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    try {
      const idBase = req.params.id;

      if (!idBase) {
        res.status(400).json({
          code: CODES_NOT.validParams,
          message: MESSAGES_NOT.validParams,
        });
        return;
      }

      const baseExists = await BaseService.getBaseById(Number(idBase));

      if (!baseExists) {
        res.status(404).json({
          code: CODES_NOT.foundBase,
          message: MESSAGES_NOT.foundBase,
        });
        return;
      }

      const baseDeleted = await BaseService.deleteBase(Number(idBase));

      res.status(200).json({
        code: CODES_SUCCESS.deleteBase,
        message: MESSAGES_SUCCESS.deleteBase,
        data: baseDeleted,
      });
    } catch (e) {
      const { status, ...response } = getExceptionMessage(e);
      res.status(status).json(response);
    }
  },
};
