import { Request, Response } from "express";

import { responseConstants } from "@app/constants/Response.constants";
import prisma from "@app/database/Prisma.database";

class TypeController {
  async getTypes(req: Request, res: Response) {
    const types = await prisma.type.findMany();

    res.status(200).json({
      code: responseConstants.successGetTypes.code,
      message: responseConstants.successGetTypes.message,
      data: types,
    });
    return;
  }

  async addType(req: Request, res: Response) {
    const body = req.body;

    const typeName = body.name ? body.name.trim() : null;

    if (!typeName) {
      res.status(400).json({
        code: responseConstants.notValidFields.code,
        message: responseConstants.notValidFields.message,
      });
      return;
    }

    const type = await prisma.type.create({ data: { name: typeName } });

    res.status(201).json({
      code: responseConstants.successAddType.code,
      message: responseConstants.successAddType.message,
      data: type,
    });
    return;
  }

  async deleteType(req: Request, res: Response) {
    const idType = req.params.idType;

    if (!idType) {
      res.status(400).json({
        code: responseConstants.notValidParams.code,
        message: responseConstants.notValidParams.message,
      });
      return;
    }

    const typeExists = await prisma.type.findUnique({
      where: { id: Number(idType) },
    });

    if (!typeExists) {
      res.status(404).json({
        code: responseConstants.notFoundType.code,
        message: responseConstants.notFoundType.message,
      });
      return;
    }

    const typeDeleted = await prisma.type.delete({
      where: { id: Number(idType) },
    });

    res.status(200).json({
      code: responseConstants.successDeleteType.code,
      message: responseConstants.successDeleteType.message,
      data: typeDeleted,
    });
    return;
  }
}

export default TypeController;
