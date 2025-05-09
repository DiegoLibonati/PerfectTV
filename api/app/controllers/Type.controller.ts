import { Request, Response } from "express";

import {
  responseSuccess,
  responseNotFound,
  responseAlreadyExists,
  responseNotValid,
} from "@app/constants/Response.constants";
import typeRepository from "@app/models/dataAccess/TypeRepository.model";

class TypeController {
  async getTypes(req: Request, res: Response) {
    const types = await typeRepository.getTypes();

    res.status(200).json({
      code: responseSuccess.getTypes.code,
      data: types,
    });
    return;
  }

  async addType(req: Request, res: Response) {
    const body = req.body;

    const code = body.code ? body.code.trim() : null;
    const description = body.description ? body.description.trim() : null;

    if (!code || !description) {
      res.status(400).json({
        code: responseNotValid.fields.code,
      });
      return;
    }

    const typeExists = await typeRepository.getTypeByCode(code);

    if (typeExists) {
      res.status(400).json({
        code: responseAlreadyExists.type.code,
      });
      return;
    }

    const type = await typeRepository.createType(code, description);

    res.status(201).json({
      code: responseSuccess.addType.code,
      data: type,
    });
    return;
  }

  async deleteType(req: Request, res: Response) {
    const idType = req.params.idType;

    if (!idType) {
      res.status(400).json({
        code: responseNotValid.params.code,
      });
      return;
    }

    const typeExists = await typeRepository.getTypeById(Number(idType));

    if (!typeExists) {
      res.status(404).json({
        code: responseNotFound.type.code,
      });
      return;
    }

    const typeDeleted = await typeRepository.deleteType(Number(idType));

    res.status(200).json({
      code: responseSuccess.deleteType.code,
      data: typeDeleted,
    });
    return;
  }
}

export default TypeController;
