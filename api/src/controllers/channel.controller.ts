import { Request, Response } from "express";

import { Channel, Source } from "@src/entities/app";

import {
  MESSAGES_ERROR,
  MESSAGES_NOT,
  MESSAGES_SUCCESS,
} from "@src/constants/messages.constant";
import {
  CODES_ERROR,
  CODES_NOT,
  CODES_SUCCESS,
} from "@src/constants/codes.constant";
import { CODE_SOURCE_FTV } from "@src/constants/vars.constant";

import { ChannelService } from "@src/services/channel.service";
import { SourceService } from "@src/services/source.service";
import { BaseService } from "@src/services/base.service";
import { TypeService } from "@src/services/type.service";
import { CategoryService } from "@src/services/category.service";

import { getExceptionMessage } from "@src/helpers/get_exception_message.helper";
import { manageBaseUrlByIframe } from "@src/helpers/manage_base_url_by_iframe.helper";
import { setChannelUrl } from "@src/helpers/set_channel_url.helper";
import { singleInvalidUrlChecker } from "@src/helpers/single_invalid_url_checker.helper";

import { envs } from "@src/configs/env.config";

export const ChannelController = {
  async getChannels(req: Request, res: Response) {
    try {
      let channels: Channel[];
      const reload = req.query.reload;

      channels = await ChannelService.getAllChannels();

      // const invalidUrlChannelExists = invalidUrlChecker(channels);

      if (!reload) {
        console.log("Endpoint getChannels executed without reload.");
        res.status(200).json({
          code: CODES_SUCCESS.getChannels,
          message: MESSAGES_SUCCESS.getChannels,
          data: channels,
        });
        return;
      }

      const sources: Source[] = await SourceService.getAllSources();

      await Promise.all(
        sources.map(async (source) => {
          const sourceId = source?.id;
          const sourceCode = source?.code;

          if (sourceCode === CODE_SOURCE_FTV && envs.ENV !== "testing") {
            await manageBaseUrlByIframe(envs.FTV_URL, sourceId);
            console.log(`Source code: ${sourceCode} base updated.`);
          }

          console.log(`Source code: ${sourceCode} pass.`);

          return source;
        })
      );

      channels = await Promise.all(
        channels.map(async (channel) => {
          const sourceIdChannel = channel.source?.id;
          const base = await BaseService.getBaseByIdSource(sourceIdChannel!);
          const baseUrl = base?.baseUrl;

          if (!channel.url.includes(baseUrl!)) {
            const channelUpdated = await setChannelUrl(channel, baseUrl!);

            return channelUpdated;
          }

          return channel;
        })
      );

      console.log("Endpoint getChannels executed.");

      res.status(200).json({
        code: CODES_SUCCESS.getChannels,
        message: MESSAGES_SUCCESS.getChannels,
        data: channels,
      });
    } catch (e) {
      const response = getExceptionMessage(e);
      res.status(500).json(response);
    }
  },

  async getChannelByNumber(req: Request, res: Response) {
    try {
      let channel: Channel | null;
      const reload = req.query.reload;

      const numberChannel = req.params.number;

      if (!numberChannel) {
        res.status(400).json({
          code: CODES_NOT.validParams,
          message: MESSAGES_NOT.validParams,
        });
        return;
      }

      channel = await ChannelService.getChannelByNumber(Number(numberChannel));

      if (!channel) {
        res.status(404).json({
          code: CODES_NOT.foundChannel,
          message: MESSAGES_NOT.foundChannel,
        });
        return;
      }

      const baseChannel = await BaseService.getBaseByIdSource(
        channel.source?.id!
      );
      const validUrlChannel = singleInvalidUrlChecker(channel?.url!);

      if (!reload && !validUrlChannel && baseChannel?.baseUrl) {
        channel = await setChannelUrl(channel, baseChannel?.baseUrl);
        console.log(
          "Endpoint getChannelByNumber executed without reload and not validUrlChannel with pre-baseUrl"
        );
        res.status(200).json({
          code: CODES_SUCCESS.getChannelByNumber,
          message: MESSAGES_SUCCESS.getChannelByNumber,
          data: channel,
        });
        return;
      }

      if (!reload && validUrlChannel) {
        console.log(
          "Endpoint getChannelByNumber executed without reload and validUrlChannel."
        );
        res.status(200).json({
          code: CODES_SUCCESS.getChannelByNumber,
          message: MESSAGES_SUCCESS.getChannelByNumber,
          data: channel,
        });
        return;
      }

      const sourceIdChannel = channel.source?.id;
      const sourceCodeChannel = channel.source?.code;

      if (sourceCodeChannel === CODE_SOURCE_FTV && envs.ENV !== "testing") {
        await manageBaseUrlByIframe(envs.FTV_URL, sourceIdChannel!);
      }

      const base = await BaseService.getBaseByIdSource(sourceIdChannel!);
      channel = await setChannelUrl(channel, base?.baseUrl!);

      console.log("Endpoint getChannelByNumber executed.");

      res.status(200).json({
        code: CODES_SUCCESS.getChannelByNumber,
        message: MESSAGES_SUCCESS.getChannelByNumber,
        data: channel,
      });
    } catch (e) {
      const response = getExceptionMessage(e);
      res.status(500).json(response);
    }
  },

  async addChannel(req: Request, res: Response) {
    try {
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
          code: CODES_NOT.validFields,
          message: MESSAGES_NOT.validFields,
        });
        return;
      }

      const channelExists = await ChannelService.getChannelByNameAndNumber(
        name,
        number
      );

      if (channelExists) {
        res.status(400).json({
          code: CODES_ERROR.channelAlreadyExists,
          message: MESSAGES_ERROR.channelAlreadyExists,
        });
        return;
      }

      const typeExists = await TypeService.getTypeById(Number(idType));

      if (!typeExists) {
        res.status(404).json({
          code: CODES_NOT.foundType,
          message: MESSAGES_NOT.foundType,
        });
        return;
      }

      const categoryExists = await CategoryService.getCategoryById(
        Number(idCategory)
      );

      if (!categoryExists) {
        res.status(404).json({
          code: CODES_NOT.foundCategory,
          message: MESSAGES_NOT.foundCategory,
        });
        return;
      }

      const sourceExists = await SourceService.getSourceById(Number(idSource));

      if (!sourceExists) {
        res.status(404).json({
          code: CODES_NOT.foundSource,
          message: MESSAGES_NOT.foundCategory,
        });
        return;
      }

      const channel = await ChannelService.createChannel({
        name: name,
        description: description,
        thumbUrl: thumbUrl,
        url: url,
        urlRest: urlRest,
        number: number,
        idType: idType,
        idCategory: idCategory,
        idSource: idSource,
      });

      res.status(201).json({
        code: CODES_SUCCESS.addChannel,
        message: MESSAGES_SUCCESS.addChannel,
        data: channel,
      });
    } catch (e) {
      const response = getExceptionMessage(e);
      res.status(500).json(response);
    }
  },

  async updateChannel(req: Request, res: Response) {
    try {
      const idChannel = req.params.id;
      const body = req.body;

      if (!idChannel) {
        res.status(400).json({
          code: CODES_NOT.validFields,
          message: MESSAGES_NOT.validFields,
        });
        return;
      }

      const channelExists = await ChannelService.getChannelById(
        Number(idChannel)
      );

      if (!channelExists) {
        res.status(404).json({
          code: CODES_NOT.foundChannel,
          message: MESSAGES_NOT.foundChannel,
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

      const channelUpdated = await ChannelService.updateChannel(
        Number(idChannel),
        data
      );

      res.status(200).json({
        code: CODES_SUCCESS.updateChannel,
        message: MESSAGES_SUCCESS.updateChannel,
        data: channelUpdated,
      });
    } catch (e) {
      const response = getExceptionMessage(e);
      res.status(500).json(response);
    }
  },

  async deleteChannel(req: Request, res: Response) {
    try {
      const idChannel = req.params.id;

      if (!idChannel) {
        res.status(400).json({
          code: CODES_NOT.validFields,
          message: MESSAGES_NOT.validFields,
        });
        return;
      }

      const channelExists = await ChannelService.getChannelById(
        Number(idChannel)
      );

      if (!channelExists) {
        res.status(404).json({
          code: CODES_NOT.foundChannel,
          message: MESSAGES_NOT.foundChannel,
        });
        return;
      }

      const channelDeleted = await ChannelService.deleteChannel(
        Number(idChannel)
      );

      res.status(200).json({
        code: CODES_SUCCESS.deleteChannel,
        message: MESSAGES_SUCCESS.deleteChannel,
        data: channelDeleted,
      });
    } catch (e) {
      const response = getExceptionMessage(e);
      res.status(500).json(response);
    }
  },

  async getChannelsNumber(_: Request, res: Response) {
    try {
      const channels: Channel[] = await ChannelService.getAllChannels();

      const numbers = channels.map((channel) => {
        return channel.number;
      });
      const numbersSorted = numbers.sort((a, b) => a - b);

      res.status(200).json({
        code: CODES_SUCCESS.getChannelNumbers,
        message: MESSAGES_SUCCESS.getChannelNumbers,
        data: numbersSorted,
      });
    } catch (e) {
      const response = getExceptionMessage(e);
      res.status(500).json(response);
    }
  },
};
