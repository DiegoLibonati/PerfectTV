import { Request, Response } from "express";

import { Channel } from "@app/entities/models";

import { config } from "@app/config/env.conf";
import {
  responseSuccess,
  responseNotFound,
  responseAlreadyExists,
  responseNotValid,
} from "@app/constants/Response.constants";
import { CODE_FTV } from "@app/constants/Sources.constants";
import channelRepository from "@app/models/dataAccess/ChannelRepository.model";
import typeRepository from "@app/models/dataAccess/TypeRepository.model";
import categoryRepository from "@app/models/dataAccess/CategoryRepository.model";
import sourceRepository from "@app/models/dataAccess/SourceRepository.model";
import baseRepository from "@app/models/dataAccess/BaseRepository.model";
import { invalidUrlChecker } from "@app/utils/invalidUrlChecker.util";
import { setChannelUrl } from "@app/utils/setChannelUrl.util";
import { manageBaseUrlByIframe } from "@app/utils/manageBaseUrlByIframe.util";

class CategoryController {
  async getChannels(req: Request, res: Response) {
    let channels: Channel[];

    const reload = req.query.reload;

    channels = await channelRepository.getChannels();

    const invalidUrlChannelExists = invalidUrlChecker(channels);

    if (!reload && !invalidUrlChannelExists) {
      console.log("Devuelo los canales de una.");
      res.status(200).json({
        code: responseSuccess.getChannels.code,
        data: channels,
      });
      return;
    }

    channels = await Promise.all(
      channels.map(async (channel) => {
        const sourceIdChannel = channel.source?.id;
        const sourceCodeChannel = channel.source?.code;

        if (sourceCodeChannel === CODE_FTV && !config.TEST_ENVIRONMENT) {
          await manageBaseUrlByIframe(config.FTV_URL!, sourceIdChannel!);
        }

        const base = await baseRepository.getBaseByIdSource(sourceIdChannel!);
        const channelUpdated = await setChannelUrl(channel, base?.baseUrl!);

        return channelUpdated;
      })
    );

    res.status(200).json({
      code: responseSuccess.getChannels.code,
      data: channels,
    });
    return;
  }

  async getChannelByNumber(req: Request, res: Response) {
    let channel: Channel | null;

    const numberChannel = req.params.numberChannel;

    if (!numberChannel) {
      res.status(400).json({
        code: responseNotValid.params.code,
      });
      return;
    }

    channel = await channelRepository.getChannelByNumber(Number(numberChannel));

    if (!channel) {
      res.status(404).json({
        code: responseNotFound.channel.code,
      });
      return;
    }

    const sourceIdChannel = channel.source?.id;
    const sourceCodeChannel = channel.source?.code;

    if (sourceCodeChannel === CODE_FTV && !config.TEST_ENVIRONMENT) {
      await manageBaseUrlByIframe(config.FTV_URL!, sourceIdChannel!);
    }

    const base = await baseRepository.getBaseByIdSource(sourceIdChannel!);
    channel = await setChannelUrl(channel, base?.baseUrl!);

    res.status(200).json({
      code: responseSuccess.getChannel.code,
      data: channel,
    });
    return;
  }

  async addChannel(req: Request, res: Response) {
    const body = req.body;

    const name = body.name ? body.name.trim() : null;
    const description = body.description ? body.description.trim() : null;
    const thumbUrl = body.thumbUrl ? body.thumbUrl.trim() : null;
    const url = body.url ? body.url.trim() : null;
    const urlRest = body.urlRest ? body.urlRest.trim() : null;
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
      });
      return;
    }

    const channelExists = await channelRepository.getChannelByNameNumber(
      name,
      number
    );

    if (channelExists) {
      res.status(400).json({
        code: responseAlreadyExists.channel.code,
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

    const categoryExists = await categoryRepository.getCategoryById(
      Number(idCategory)
    );

    if (!categoryExists) {
      res.status(404).json({
        code: responseNotFound.category.code,
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

    const channel = await channelRepository.createChannel(
      name,
      description,
      thumbUrl,
      url,
      urlRest,
      number,
      idType,
      idCategory,
      idSource
    );

    res.status(201).json({
      code: responseSuccess.addChannel.code,
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
      });
      return;
    }

    const channelExists = await channelRepository.getChannelById(
      Number(idChannel)
    );

    if (!channelExists) {
      res.status(404).json({
        code: responseNotFound.channel.code,
      });
      return;
    }

    const name = body.name ? body.name.trim() : null;
    const description = body.description ? body.description.trim() : null;
    const thumbUrl = body.thumbUrl ? body.thumbUrl.trim() : null;
    const url = body.url ? body.url.trim() : null;
    const urlRest = body.urlRest ? body.urlRest.trim() : null;
    const number = body.number;
    const idType = body.idType;
    const idCategory = body.idCategory;
    const idSource = body.idSource;

    const data = {
      ...(name && { name: name }),
      ...(description && { description: description }),
      ...(thumbUrl && { thumbUrl: thumbUrl }),
      ...(url && { url: url }),
      ...(urlRest && { urlRest: urlRest }),
      ...(number !== undefined && { number: number }),
      ...(idType !== undefined && { idType: idType }),
      ...(idCategory !== undefined && { idCategory: idCategory }),
      ...(idSource !== undefined && { idSource: idSource }),
    };

    console.log(data);

    const channelUpdated = await channelRepository.updateChannel(
      Number(idChannel),
      data
    );

    res.status(200).json({
      code: responseSuccess.updateChannel.code,
      data: channelUpdated,
    });
    return;
  }

  async deleteChannel(req: Request, res: Response) {
    const idChannel = req.params.idChannel;

    if (!idChannel) {
      res.status(400).json({
        code: responseNotValid.params.code,
      });
      return;
    }

    const channelExists = await channelRepository.getChannelById(
      Number(idChannel)
    );

    if (!channelExists) {
      res.status(404).json({
        code: responseNotFound.channel.code,
      });
      return;
    }

    const channelDeleted = await channelRepository.deleteChannel(
      Number(idChannel)
    );

    res.status(200).json({
      code: responseSuccess.deleteChannel.code,
      data: channelDeleted,
    });
    return;
  }
}

export default CategoryController;
