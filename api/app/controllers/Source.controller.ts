import { Request, Response } from "express";

import {
  responseSuccess,
  responseNotFound,
  responseAlreadyExists,
  responseNotValid,
} from "@app/constants/Response.constants";
import sourceRepository from "@app/models/dataAccess/SourceRepository.model";

class SourceController {
  async getSources(req: Request, res: Response) {
    const sources = await sourceRepository.getSources();

    res.status(200).json({
      code: responseSuccess.getSources.code,
      data: sources,
    });
    return;
  }

  async addSource(req: Request, res: Response) {
    const body = req.body;

    const code = body.code ? body.code.trim() : null;
    const description = body.description ? body.description.trim() : null;

    if (!code || !description) {
      res.status(400).json({
        code: responseNotValid.fields.code,
      });
      return;
    }

    const sourceExists = await sourceRepository.getSourceByCode(code);

    if (sourceExists) {
      res.status(400).json({
        code: responseAlreadyExists.source.code,
      });
      return;
    }

    const source = await sourceRepository.createSource(code, description);

    res.status(201).json({
      code: responseSuccess.addSource.code,
      data: source,
    });
    return;
  }

  async deleteSource(req: Request, res: Response) {
    const idSource = req.params.idSource;

    if (!idSource) {
      res.status(400).json({
        code: responseNotValid.params.code,
      });
      return;
    }

    const sourceExists = await sourceRepository.getSourceById(Number(idSource));

    if (!sourceExists) {
      res.status(404).json({
        code: responseNotFound.source.code,
      });
      return;
    }

    const sourceDeleted = await sourceRepository.deleteSource(Number(idSource));

    res.status(200).json({
      code: responseSuccess.deleteSource.code,
      data: sourceDeleted,
    });
    return;
  }
}

export default SourceController;
