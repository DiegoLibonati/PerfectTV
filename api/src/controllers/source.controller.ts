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

import { SourceService } from "@src/services/source.service";

export const SourceController = {
  async getSources(_: Request, res: Response) {
    try {
      const sources = await SourceService.getAllSources();

      return res.status(200).json({
        code: CODES_SUCCESS.getSources,
        message: MESSAGES_SUCCESS.getSources,
        data: sources,
      });
    } catch (e) {
      const response = getExceptionMessage(e);
      return res.status(500).json(response);
    }
  },
  async addSource(req: Request, res: Response) {
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

      const sourceExists = await SourceService.getSourceByCode(code);

      if (sourceExists) {
        return res.status(400).json({
          code: CODES_ERROR.sourceAlreadyExists,
          message: MESSAGES_ERROR.sourceAlreadyExists,
        });
      }

      const source = await SourceService.createSource({
        code: code,
        description: description,
      });

      return res.status(201).json({
        code: CODES_SUCCESS.addSource,
        message: MESSAGES_SUCCESS.addSource,
        data: source,
      });
    } catch (e) {
      const response = getExceptionMessage(e);
      return res.status(500).json(response);
    }
  },
  async deleteSource(req: Request, res: Response) {
    try {
      const idSource = req.params.id;

      if (!idSource) {
        return res.status(400).json({
          code: CODES_NOT.validParams,
          message: MESSAGES_NOT.validParams,
        });
      }

      const sourceExists = await SourceService.getSourceById(Number(idSource));

      if (!sourceExists) {
        return res.status(404).json({
          code: CODES_NOT.foundSource,
          message: MESSAGES_NOT.foundSource,
        });
      }

      const sourceDeleted = await SourceService.deleteSource(Number(idSource));

      return res.status(200).json({
        code: CODES_SUCCESS.deleteSource,
        message: MESSAGES_SUCCESS.deleteSource,
        data: sourceDeleted,
      });
    } catch (e) {
      const response = getExceptionMessage(e);
      return res.status(500).json(response);
    }
  },
};
