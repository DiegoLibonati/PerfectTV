import { Request, Response } from "express";

import { responseConstants } from "@app/constants/Response.constants";
import prisma from "@app/database/Prisma.database";

class CategoryController {
  async getChannels(req: Request, res: Response) {
    const channels = await prisma.channel.findMany();

    res.status(200).json({
      code: responseConstants.successGetChannels.code,
      message: responseConstants.successGetChannels.message,
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
        code: responseConstants.notValidFields.code,
        message: responseConstants.notValidFields.message,
      });
      return;
    }

    const channelExists = await prisma.channel.findUnique({
      where: { name: channelName, number: channelNumber },
    });

    if (channelExists) {
      res.status(400).json({
        code: responseConstants.alreadyExistsChannel.code,
        message: responseConstants.alreadyExistsChannel.message,
      });
      return;
    }

    const typeExists = await prisma.type.findUnique({
      where: { id: Number(channelType) },
    });

    if (!typeExists) {
      res.status(404).json({
        code: responseConstants.notFoundType.code,
        message: responseConstants.notFoundType.message,
      });
      return;
    }

    const categoryExists = await prisma.category.findUnique({
      where: { id: Number(channelCategory) },
    });

    if (!categoryExists) {
      res.status(404).json({
        code: responseConstants.notFoundCategory.code,
        message: responseConstants.notFoundCategory.message,
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
      code: responseConstants.successAddChannel.code,
      message: responseConstants.successAddChannel.message,
      data: channel,
    });
    return;
  }

  async deleteChannel(req: Request, res: Response) {
    const idChannel = req.params.idChannel;

    if (!idChannel) {
      res.status(400).json({
        code: responseConstants.notValidParams.code,
        message: responseConstants.notValidParams.message,
      });
      return;
    }

    const channelExists = await prisma.channel.findUnique({
      where: { id: Number(idChannel) },
    });

    if (!channelExists) {
      res.status(404).json({
        code: responseConstants.notFoundChannel.code,
        message: responseConstants.notFoundChannel.message,
      });
      return;
    }

    const channelDeleted = await prisma.channel.delete({
      where: { id: Number(idChannel) },
    });

    res.status(200).json({
      code: responseConstants.successDeleteChannel.code,
      message: responseConstants.successDeleteChannel.message,
      data: channelDeleted,
    });
    return;
  }
}

export default CategoryController;
