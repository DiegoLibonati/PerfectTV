import type { Request, Response } from "express";
import type { SourceCreatePayload } from "@/types/payloads";

import { SourceService } from "@/services/source.service";

import { getExceptionMessage } from "@/helpers/get_exception_message.helper";

import { MESSAGES_ERROR, MESSAGES_NOT, MESSAGES_SUCCESS } from "@/constants/messages.constant";
import { CODES_ERROR, CODES_NOT, CODES_SUCCESS } from "@/constants/codes.constant";

export const SourceController = {
  getSources: async (_: Request, res: Response): Promise<void> => {
    try {
      const sources = await SourceService.getAllSources();

      res.status(200).json({
        code: CODES_SUCCESS.getSources,
        message: MESSAGES_SUCCESS.getSources,
        data: sources,
      });
    } catch (e) {
      const { status, ...response } = getExceptionMessage(e);
      res.status(status).json(response);
    }
  },

  addSource: async (
    req: Request<object, object, Partial<SourceCreatePayload>>,
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

      const sourceExists = await SourceService.getSourceByCode(code);

      if (sourceExists) {
        res.status(400).json({
          code: CODES_ERROR.sourceAlreadyExists,
          message: MESSAGES_ERROR.sourceAlreadyExists,
        });
        return;
      }

      const source = await SourceService.createSource({ code, description });

      res.status(201).json({
        code: CODES_SUCCESS.addSource,
        message: MESSAGES_SUCCESS.addSource,
        data: source,
      });
    } catch (e) {
      const { status, ...response } = getExceptionMessage(e);
      res.status(status).json(response);
    }
  },

  deleteSource: async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    try {
      const idSource = req.params.id;

      if (!idSource) {
        res.status(400).json({
          code: CODES_NOT.validParams,
          message: MESSAGES_NOT.validParams,
        });
        return;
      }

      const sourceExists = await SourceService.getSourceById(Number(idSource));

      if (!sourceExists) {
        res.status(404).json({
          code: CODES_NOT.foundSource,
          message: MESSAGES_NOT.foundSource,
        });
        return;
      }

      const sourceDeleted = await SourceService.deleteSource(Number(idSource));

      res.status(200).json({
        code: CODES_SUCCESS.deleteSource,
        message: MESSAGES_SUCCESS.deleteSource,
        data: sourceDeleted,
      });
    } catch (e) {
      const { status, ...response } = getExceptionMessage(e);
      res.status(status).json(response);
    }
  },
};
