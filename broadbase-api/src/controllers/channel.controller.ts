import type { Request, Response } from "express";
import type { ChannelWithRelations, SourceWithRelations } from "@/types/app";
import type { ChannelCreatePayload, ChannelUpdatePayload } from "@/types/payloads";

import { envs } from "@/configs/env.config";

import { ChannelService } from "@/services/channel.service";
import { SourceService } from "@/services/source.service";
import { BaseService } from "@/services/base.service";
import { TypeService } from "@/services/type.service";
import { CategoryService } from "@/services/category.service";

import { getExceptionMessage } from "@/helpers/get_exception_message.helper";
import { manageBaseUrlByIframe } from "@/helpers/manage_base_url_by_iframe.helper";
import { setChannelUrl } from "@/helpers/set_channel_url.helper";
import { singleInvalidUrlChecker } from "@/helpers/single_invalid_url_checker.helper";

import { MESSAGES_ERROR, MESSAGES_NOT, MESSAGES_SUCCESS } from "@/constants/messages.constant";
import { CODES_ERROR, CODES_NOT, CODES_SUCCESS } from "@/constants/codes.constant";
import { CODE_SOURCE_FTV } from "@/constants/vars.constant";

export const ChannelController = {
  getChannels: async (req: Request, res: Response): Promise<void> => {
    try {
      let channels: ChannelWithRelations[];
      const reload = req.query.reload;

      channels = await ChannelService.getAllChannels();

      if (!reload) {
        console.log("Endpoint getChannels executed without reload.");
        res.status(200).json({
          code: CODES_SUCCESS.getChannels,
          message: MESSAGES_SUCCESS.getChannels,
          data: channels,
        });
        return;
      }

      const sources: SourceWithRelations[] = await SourceService.getAllSources();

      await Promise.all(
        sources.map(async (source) => {
          const sourceId = source.id;
          const sourceCode = source.code;

          if (sourceCode === CODE_SOURCE_FTV && envs.ENV !== "test") {
            await manageBaseUrlByIframe(envs.FTV_URL, sourceId);
            console.log(`Source code: ${sourceCode} base updated.`);
          }

          console.log(`Source code: ${sourceCode} pass.`);

          return source;
        })
      );

      channels = await Promise.all(
        channels.map(async (channel) => {
          const sourceIdChannel = channel.source.id;
          const base = await BaseService.getBaseByIdSource(sourceIdChannel);
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
      const { status, ...response } = getExceptionMessage(e);
      res.status(status).json(response);
    }
  },

  getChannelByNumber: async (req: Request<{ number: string }>, res: Response): Promise<void> => {
    try {
      let channel: ChannelWithRelations | null;
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

      const baseChannel = await BaseService.getBaseByIdSource(channel.source.id);
      const validUrlChannel = singleInvalidUrlChecker(channel.url);

      if (!reload && !validUrlChannel && baseChannel?.baseUrl) {
        channel = await setChannelUrl(channel, baseChannel.baseUrl);
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
        console.log("Endpoint getChannelByNumber executed without reload and validUrlChannel.");
        res.status(200).json({
          code: CODES_SUCCESS.getChannelByNumber,
          message: MESSAGES_SUCCESS.getChannelByNumber,
          data: channel,
        });
        return;
      }

      const sourceIdChannel = channel.source.id;
      const sourceCodeChannel = channel.source.code;

      if (sourceCodeChannel === CODE_SOURCE_FTV && envs.ENV !== "test") {
        await manageBaseUrlByIframe(envs.FTV_URL, sourceIdChannel);
      }

      const base = await BaseService.getBaseByIdSource(sourceIdChannel);
      channel = await setChannelUrl(channel, base!.baseUrl);

      console.log("Endpoint getChannelByNumber executed.");

      res.status(200).json({
        code: CODES_SUCCESS.getChannelByNumber,
        message: MESSAGES_SUCCESS.getChannelByNumber,
        data: channel,
      });
    } catch (e) {
      const { status, ...response } = getExceptionMessage(e);
      res.status(status).json(response);
    }
  },

  addChannel: async (
    req: Request<object, object, Partial<ChannelCreatePayload>>,
    res: Response
  ): Promise<void> => {
    try {
      const {
        name: rawName,
        description: rawDescription,
        thumbUrl: rawThumbUrl,
        url: rawUrl,
        urlRest: rawUrlRest,
        number,
        idType,
        idCategory,
        idSource,
      } = req.body;

      const name = rawName ? rawName.trim() : null;
      const description = rawDescription ? rawDescription.trim() : null;
      const thumbUrl = rawThumbUrl ? rawThumbUrl.trim() : null;
      const url = rawUrl ? rawUrl.trim() : null;
      const urlRest = rawUrlRest ? rawUrlRest.trim() : null;

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

      const channelExists = await ChannelService.getChannelByNameAndNumber(name, number);

      if (channelExists) {
        res.status(400).json({
          code: CODES_ERROR.channelAlreadyExists,
          message: MESSAGES_ERROR.channelAlreadyExists,
        });
        return;
      }

      const typeExists = await TypeService.getTypeById(idType);

      if (!typeExists) {
        res.status(404).json({
          code: CODES_NOT.foundType,
          message: MESSAGES_NOT.foundType,
        });
        return;
      }

      const categoryExists = await CategoryService.getCategoryById(idCategory);

      if (!categoryExists) {
        res.status(404).json({
          code: CODES_NOT.foundCategory,
          message: MESSAGES_NOT.foundCategory,
        });
        return;
      }

      const sourceExists = await SourceService.getSourceById(idSource);

      if (!sourceExists) {
        res.status(404).json({
          code: CODES_NOT.foundSource,
          message: MESSAGES_NOT.foundSource,
        });
        return;
      }

      const channel = await ChannelService.createChannel({
        name,
        description,
        thumbUrl,
        url,
        urlRest,
        number,
        idType,
        idCategory,
        idSource,
      });

      res.status(201).json({
        code: CODES_SUCCESS.addChannel,
        message: MESSAGES_SUCCESS.addChannel,
        data: channel,
      });
    } catch (e) {
      const { status, ...response } = getExceptionMessage(e);
      res.status(status).json(response);
    }
  },

  updateChannel: async (
    req: Request<{ id: string }, object, ChannelUpdatePayload>,
    res: Response
  ): Promise<void> => {
    try {
      const idChannel = req.params.id;

      if (!idChannel) {
        res.status(400).json({
          code: CODES_NOT.validParams,
          message: MESSAGES_NOT.validParams,
        });
        return;
      }

      const channelExists = await ChannelService.getChannelById(Number(idChannel));

      if (!channelExists) {
        res.status(404).json({
          code: CODES_NOT.foundChannel,
          message: MESSAGES_NOT.foundChannel,
        });
        return;
      }

      const {
        name: rawName,
        description: rawDescription,
        thumbUrl: rawThumbUrl,
        url: rawUrl,
        urlRest: rawUrlRest,
        number,
        idType,
        idCategory,
        idSource,
      } = req.body;

      const name = rawName ? rawName.trim() : null;
      const description = rawDescription ? rawDescription.trim() : null;
      const thumbUrl = rawThumbUrl ? rawThumbUrl.trim() : null;
      const url = rawUrl ? rawUrl.trim() : null;
      const urlRest = rawUrlRest ? rawUrlRest.trim() : null;

      const data = {
        ...(name && { name }),
        ...(description && { description }),
        ...(thumbUrl && { thumbUrl }),
        ...(url && { url }),
        ...(urlRest && { urlRest }),
        ...(number !== undefined && { number }),
        ...(idType !== undefined && { idType }),
        ...(idCategory !== undefined && { idCategory }),
        ...(idSource !== undefined && { idSource }),
      };

      const channelUpdated = await ChannelService.updateChannel(Number(idChannel), data);

      res.status(200).json({
        code: CODES_SUCCESS.updateChannel,
        message: MESSAGES_SUCCESS.updateChannel,
        data: channelUpdated,
      });
    } catch (e) {
      const { status, ...response } = getExceptionMessage(e);
      res.status(status).json(response);
    }
  },

  deleteChannel: async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    try {
      const idChannel = req.params.id;

      if (!idChannel) {
        res.status(400).json({
          code: CODES_NOT.validParams,
          message: MESSAGES_NOT.validParams,
        });
        return;
      }

      const channelExists = await ChannelService.getChannelById(Number(idChannel));

      if (!channelExists) {
        res.status(404).json({
          code: CODES_NOT.foundChannel,
          message: MESSAGES_NOT.foundChannel,
        });
        return;
      }

      const channelDeleted = await ChannelService.deleteChannel(Number(idChannel));

      res.status(200).json({
        code: CODES_SUCCESS.deleteChannel,
        message: MESSAGES_SUCCESS.deleteChannel,
        data: channelDeleted,
      });
    } catch (e) {
      const { status, ...response } = getExceptionMessage(e);
      res.status(status).json(response);
    }
  },

  getChannelsNumber: async (_: Request, res: Response): Promise<void> => {
    try {
      const channels: ChannelWithRelations[] = await ChannelService.getAllChannels();

      const numbers = channels.map((channel) => channel.number);
      const numbersSorted = numbers.sort((a, b) => a - b);

      res.status(200).json({
        code: CODES_SUCCESS.getChannelNumbers,
        message: MESSAGES_SUCCESS.getChannelNumbers,
        data: numbersSorted,
      });
    } catch (e) {
      const { status, ...response } = getExceptionMessage(e);
      res.status(status).json(response);
    }
  },
};
