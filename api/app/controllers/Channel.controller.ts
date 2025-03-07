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
    const reload = req.query.reload;

    const channels = await prisma.channel.findMany({
      include: { type: true, category: true, source: true },
      omit: { idCategory: true, idType: true, idSource: true },
    });

    const invalidUrlChannelExists = channels.some(
      (channel) => !channel.url.includes("https")
    );

    if (!reload && !invalidUrlChannelExists) {
      res.status(200).json({
        code: responseSuccess.getChannels.code,
        message: responseSuccess.getChannels.message,
        data: channels,
      });
      return;
    }

    // TODO: Si el param: reload. Se busca de nuevo URLS

    res.status(200).json({
      code: responseSuccess.getChannels.code,
      message: responseSuccess.getChannels.message,
      data: channels,
    });
    return;
  }

  async addChannel(req: Request, res: Response) {
    const body = req.body;

    const name = body.name ? body.name.trim() : null;
    const description = body.description ? body.description.trim() : null;
    const thumbUrl = body.thumbUrl ? body.thumbUrl.trim() : null;
    const url = body.url ? body.url.trim() : null;
    const number = body.number;
    const idType = body.idType;
    const idCategory = body.idCategory;
    const idSource = body.idSource;

    if (
      !name ||
      !description ||
      !thumbUrl ||
      !url ||
      !number ||
      !idType ||
      !idCategory ||
      !idSource
    ) {
      res.status(400).json({
        code: responseNotValid.fields.code,
        message: responseNotValid.fields.message,
      });
      return;
    }

    const channelExists = await prisma.channel.findUnique({
      where: { name: name, number: number },
    });

    if (channelExists) {
      res.status(400).json({
        code: responseAlreadyExists.channel.code,
        message: responseAlreadyExists.channel.message,
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

    const categoryExists = await prisma.category.findUnique({
      where: { id: Number(idCategory) },
    });

    if (!categoryExists) {
      res.status(404).json({
        code: responseNotFound.category.code,
        message: responseNotFound.category.message,
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

    const channel = await prisma.channel.create({
      data: {
        name: name,
        description: description,
        thumbUrl: thumbUrl,
        url: url,
        number: number,
        idType: idType,
        idCategory: idCategory,
        idSource: idSource,
      },
      include: { type: true, category: true, source: true },
      omit: { idCategory: true, idType: true, idSource: true },
    });

    res.status(201).json({
      code: responseSuccess.addChannel.code,
      message: responseSuccess.addChannel.message,
      data: channel,
    });
    return;
  }

  async updateChannel(req: Request, res: Response) {
    const idChannel = req.params.idChannel;
    const body = req.body;

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

    const name = body.name ? body.name.trim() : null;
    const description = body.description ? body.description.trim() : null;
    const thumbUrl = body.thumbUrl ? body.thumbUrl.trim() : null;
    const url = body.url ? body.url.trim() : null;
    const number = body.number;
    const idType = body.idType;
    const idCategory = body.idCategory;
    const idSource = body.idSource;

    const data = {
      ...(name && { name: name }),
      ...(description && { description: description }),
      ...(thumbUrl && { thumbUrl: thumbUrl }),
      ...(url && { url: url }),
      ...(number !== undefined && { number: number }),
      ...(idType !== undefined && { idType: idType }),
      ...(idCategory !== undefined && { idCategory: idCategory }),
      ...(idSource !== undefined && { idSource: idSource }),
    };

    const channelUpdated = await prisma.channel.update({
      where: { id: Number(idChannel) },
      data: data,
      include: { type: true, category: true, source: true },
      omit: { idCategory: true, idType: true, idSource: true },
    });

    res.status(200).json({
      code: responseSuccess.updateChannel.code,
      message: responseSuccess.updateChannel.message,
      data: channelUpdated,
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
      include: { type: true, category: true, source: true },
      omit: { idCategory: true, idType: true, idSource: true },
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
