import { Request, Response } from "express";

import {
  responseSuccess,
  responseNotFound,
  responseAlreadyExists,
  responseNotValid,
} from "@app/constants/Response.constants";
import  baseRepository from "@app/models/dataAccess/BaseRepository.model";

class BaseController {
  async getBases(req: Request, res: Response) {
    const bases = await baseRepository.getBases();

    res.status(200).json({
      code: responseSuccess.getBases.code,
      message: responseSuccess.getBases.message,
      data: bases,
    });
    return;
  }

  async addBase(req: Request, res: Response) {
    const body = req.body;

    const baseUrl = body.baseUrl ? body.baseUrl.trim() : null;
    const idSource = body.idSource;

    if (!baseUrl || !idSource) {
      res.status(400).json({
        code: responseNotValid.fields.code,
        message: responseNotValid.fields.message,
      });
      return;
    }

    const baseExists = await baseRepository.getBaseByIdSource(idSource);

    if (baseExists) {
      res.status(400).json({
        code: responseAlreadyExists.base.code,
        message: responseAlreadyExists.base.message,
      });
      return;
    }

    const base = await baseRepository.createBase(baseUrl, idSource);

    res.status(201).json({
      code: responseSuccess.addBase.code,
      message: responseSuccess.addBase.message,
      data: base,
    });
    return;
  }

  async updateBase(req: Request, res: Response) {
    const idBase = req.params.idBase;
    const body = req.body;

    if (!idBase) {
      res.status(400).json({
        code: responseNotValid.params.code,
        message: responseNotValid.params.message,
      });
      return;
    }

    const baseExists = await baseRepository.getBaseById(
      Number(idBase)
    );

    if (!baseExists) {
      res.status(404).json({
        code: responseNotFound.base.code,
        message: responseNotFound.base.message,
      });
      return;
    }

    const baseUrl = body.baseUrl ? body.baseUrl.trim() : null;
    const idSource = body.idSource;

    const data = {
      ...(baseUrl && { baseUrl: baseUrl }),
      ...(idSource !== undefined && { idSource: idSource }),
    };

    const baseUpdated = await baseRepository.updateBase(
      Number(idBase),
      data
    );

    res.status(200).json({
      code: responseSuccess.updateBase.code,
      message: responseSuccess.updateBase.message,
      data: baseUpdated,
    });
    return;
  }

  async deleteBase(req: Request, res: Response) {
    const idBase = req.params.idBase;

    if (!idBase) {
      res.status(400).json({
        code: responseNotValid.params.code,
        message: responseNotValid.params.message,
      });
      return;
    }

    const baseExists = await baseRepository.getBaseById(Number(idBase));

    if (!baseExists) {
      res.status(404).json({
        code: responseNotFound.base.code,
        message: responseNotFound.base.message,
      });
      return;
    }

    const baseDeleted = await baseRepository.deleteBase(Number(idBase));

    res.status(200).json({
      code: responseSuccess.deleteBase.code,
      message: responseSuccess.deleteBase.message,
      data: baseDeleted,
    });
    return;
  }
}

export default BaseController;
