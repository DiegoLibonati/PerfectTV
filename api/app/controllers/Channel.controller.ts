import { Request, Response } from "express";

import {
  responseSuccess,
  responseNotFound,
  responseAlreadyExists,
  responseNotValid,
} from "@app/constants/Response.constants";
import prisma from "@app/database/Prisma.database";

class CategoryController {
  async getChannels(req: Request, res: Response) {
    const channels = await prisma.channel.findMany({
      include: { type: true, category: true },
      omit: { idCategory: true, idType: true },
    });

    res.status(200).json({
      code: responseSuccess.getChannels.code,
      message: responseSuccess.getChannels.message,
      data: channels,
    });
    return;
  }

  async addChannel(req: Request, res: Response) {
    const body = req.body;

    const channelName = body.name ? body.name.trim() : null;
    const channelDescription = body.description
      ? body.description.trim()
      : null;
    const channelThumbUrl = body.thumbUrl ? body.thumbUrl.trim() : null;
    const channelUrl = body.url ? body.url.trim() : null;
    const channelNumber = body.number;
    const channelType = body.idType;
    const channelCategory = body.idCategory;

    if (
      !channelName ||
      !channelDescription ||
      !channelThumbUrl ||
      !channelUrl ||
      !channelNumber ||
      !channelType ||
      !channelCategory
    ) {
      res.status(400).json({
        code: responseNotValid.fields.code,
        message: responseNotValid.fields.message,
      });
      return;
    }

    const channelExists = await prisma.channel.findUnique({
      where: { name: channelName, number: channelNumber },
    });

    if (channelExists) {
      res.status(400).json({
        code: responseAlreadyExists.channel.code,
        message: responseAlreadyExists.channel.message,
      });
      return;
    }

    const typeExists = await prisma.type.findUnique({
      where: { id: Number(channelType) },
    });

    if (!typeExists) {
      res.status(404).json({
        code: responseNotFound.type.code,
        message: responseNotFound.type.message,
      });
      return;
    }

    const categoryExists = await prisma.category.findUnique({
      where: { id: Number(channelCategory) },
    });

    if (!categoryExists) {
      res.status(404).json({
        code: responseNotFound.category.code,
        message: responseNotFound.category.message,
      });
      return;
    }

    const channel = await prisma.channel.create({
      data: {
        name: channelName,
        description: channelDescription,
        thumbUrl: channelThumbUrl,
        url: channelUrl,
        number: channelNumber,
        idType: channelType,
        idCategory: channelCategory,
      },
    });

    res.status(201).json({
      code: responseSuccess.addChannel.code,
      message: responseSuccess.addChannel.message,
      data: channel,
    });
    return;
  }

  async deleteChannel(req: Request, res: Response) {
    const idChannel = req.params.idChannel;

    if (!idChannel) {
      res.status(400).json({
        code: responseNotValid.params.code,
        message: responseNotValid.params.message,
      });
      return;
    }

    const channelExists = await prisma.channel.findUnique({
      where: { id: Number(idChannel) },
    });

    if (!channelExists) {
      res.status(404).json({
        code: responseNotFound.channel.code,
        message: responseNotFound.channel.message,
      });
      return;
    }

    const channelDeleted = await prisma.channel.delete({
      where: { id: Number(idChannel) },
    });

    res.status(200).json({
      code: responseSuccess.deleteChannel.code,
      message: responseSuccess.deleteChannel.message,
      data: channelDeleted,
    });
    return;
  }
}

export default CategoryController;
