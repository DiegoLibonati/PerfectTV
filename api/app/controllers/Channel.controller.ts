import { Request, Response } from "express";

import { Channel } from "@app/entities/models";

import {
  responseSuccess,
  responseNotFound,
  responseAlreadyExists,
  responseNotValid,
} from "@app/constants/Response.constants";
import { config } from "@app/config/env.conf";
import { CODE_FTV } from "@app/constants/Sources.constants";
import { invalidUrlChecker } from "@app/utils/invalidUrlChecker.util";
import { sourceCodeChecker } from "@app/utils/sourceCodeChecker.util";
import { getSrcByIframe } from "@app/utils/getSrcByIframe.util";
import { setChannelUrlBySourceCode } from "@app/utils/setChannelUrlBySourceCode.util";
import channelRepository from "@app/models/dataAccess/ChannelRepository.model";
import typeRepository from "@app/models/dataAccess/TypeRepository.model";
import categoryRepository from "@app/models/dataAccess/CategoryRepository.model";
import sourceRepository from "@app/models/dataAccess/SourceRepository.model";

class CategoryController {
  async getChannels(req: Request, res: Response) {
    let channels: Channel[];

    const reload = req.query.reload;

    channels = await channelRepository.getChannels();

    // TODO: Esto iniciarlo con la APP ?????
    const invalidUrlChannelExists = invalidUrlChecker(channels);

    if (!reload && !invalidUrlChannelExists) {
      console.log("Devuelo los canales de una.");
      res.status(200).json({
        code: responseSuccess.getChannels.code,
        message: responseSuccess.getChannels.message,
        data: channels,
      });
      return;
    }

    const ftvChannelExists = sourceCodeChecker(channels, CODE_FTV);

    if (ftvChannelExists) {
      const srcUrl = await getSrcByIframe(config.FTV_URL!);

      const baseUrl = srcUrl.split("?")[0];

      channels = await setChannelUrlBySourceCode(channels, CODE_FTV, baseUrl);
    }

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

    const channelExists = await channelRepository.getChannelByNameNumberUrl(
      name,
      number,
      url
    );

    if (channelExists) {
      res.status(400).json({
        code: responseAlreadyExists.channel.code,
        message: responseAlreadyExists.channel.message,
      });
      return;
    }

    const typeExists = await typeRepository.getTypeById(Number(idType));

    if (!typeExists) {
      res.status(404).json({
        code: responseNotFound.type.code,
        message: responseNotFound.type.message,
      });
      return;
    }

    const categoryExists = await categoryRepository.getCategoryById(
      Number(idCategory)
    );

    if (!categoryExists) {
      res.status(404).json({
        code: responseNotFound.category.code,
        message: responseNotFound.category.message,
      });
      return;
    }

    const sourceExists = await sourceRepository.getSourceById(Number(idSource));

    if (!sourceExists) {
      res.status(404).json({
        code: responseNotFound.source.code,
        message: responseNotFound.source.message,
      });
      return;
    }

    const channel = await channelRepository.createChannel(
      name,
      description,
      thumbUrl,
      url,
      number,
      idType,
      idCategory,
      idSource
    );

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

    const channelExists = await channelRepository.getChannelById(
      Number(idChannel)
    );

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

    const channelUpdated = await channelRepository.updateChannel(
      Number(idChannel),
      data
    );

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

    const channelExists = await channelRepository.getChannelById(
      Number(idChannel)
    );

    if (!channelExists) {
      res.status(404).json({
        code: responseNotFound.channel.code,
        message: responseNotFound.channel.message,
      });
      return;
    }

    const channelDeleted = await channelRepository.deleteChannel(
      Number(idChannel)
    );

    res.status(200).json({
      code: responseSuccess.deleteChannel.code,
      message: responseSuccess.deleteChannel.message,
      data: channelDeleted,
    });
    return;
  }
}

export default CategoryController;
