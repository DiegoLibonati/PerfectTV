import { Request, Response } from "express";

import {
  responseSuccess,
  responseNotFound,
  responseAlreadyExists,
  responseNotValid,
} from "@app/constants/Response.constants";
import prisma from "@app/database/Prisma.database";

class SourceController {
  async getSources(req: Request, res: Response) {
    const sources = await prisma.source.findMany();

    res.status(200).json({
      code: responseSuccess.getSources.code,
      message: responseSuccess.getSources.message,
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
        message: responseNotValid.fields.message,
      });
      return;
    }

    const sourceExists = await prisma.source.findUnique({
      where: { code: code },
    });

    if (sourceExists) {
      res.status(400).json({
        code: responseAlreadyExists.source.code,
        message: responseAlreadyExists.source.message,
      });
      return;
    }

    const source = await prisma.source.create({
      data: { code: code, description: description },
    });

    res.status(201).json({
      code: responseSuccess.addSource.code,
      message: responseSuccess.addSource.message,
      data: source,
    });
    return;
  }

  async deleteSource(req: Request, res: Response) {
    const idSource = req.params.idSource;

    if (!idSource) {
      res.status(400).json({
        code: responseNotValid.params.code,
        message: responseNotValid.params.message,
      });
      return;
    }

    const sourceExists = await prisma.source.findUnique({
      where: { id: Number(idSource) },
    });

    if (!sourceExists) {
      res.status(404).json({
        code: responseNotFound.source.code,
        message: responseNotFound.source.message,
      });
      return;
    }

    const sourceDeleted = await prisma.source.delete({
      where: { id: Number(idSource) },
    });

    res.status(200).json({
      code: responseSuccess.deleteSource.code,
      message: responseSuccess.deleteSource.message,
      data: sourceDeleted,
    });
    return;
  }
}

export default SourceController;
