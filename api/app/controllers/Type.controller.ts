import { Request, Response } from "express";

import { responseSuccess, responseNotFound, responseAlreadyExists, responseNotValid } from "@app/constants/Response.constants";
import prisma from "@app/database/Prisma.database";

class TypeController {
  async getTypes(req: Request, res: Response) {
    const types = await prisma.type.findMany();

    res.status(200).json({
      code: responseSuccess.getTypes.code,
      message: responseSuccess.getTypes.message,
      data: types,
    });
    return;
  }

  async addType(req: Request, res: Response) {
    const body = req.body;

    const typeName = body.name ? body.name.trim() : null;

    if (!typeName) {
      res.status(400).json({
        code: responseNotValid.fields.code,
        message: responseNotValid.fields.message,
      });
      return;
    }

    const typeExists = await prisma.type.findUnique({
      where: { name: typeName },
    });

    if (typeExists) {
      res.status(400).json({
        code: responseAlreadyExists.type.code,
        message: responseAlreadyExists.type.message,
      });
      return;
    }

    const type = await prisma.type.create({ data: { name: typeName } });

    res.status(201).json({
      code: responseSuccess.addType.code,
      message: responseSuccess.addType.message,
      data: type,
    });
    return;
  }

  async deleteType(req: Request, res: Response) {
    const idType = req.params.idType;

    if (!idType) {
      res.status(400).json({
        code: responseNotValid.params.code,
        message: responseNotValid.params.message,
      });
      return;
    }

    const typeExists = await prisma.type.findUnique({
      where: { id: Number(idType) },
    });

    if (!typeExists) {
      res.status(404).json({
        code: responseNotFound.type.code,
        message: responseNotFound.type.message,
      });
      return;
    }

    const typeDeleted = await prisma.type.delete({
      where: { id: Number(idType) },
    });

    res.status(200).json({
      code: responseSuccess.deleteType.code,
      message: responseSuccess.deleteType.message,
      data: typeDeleted,
    });
    return;
  }
}

export default TypeController;
