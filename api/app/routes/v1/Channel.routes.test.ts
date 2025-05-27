import request from "supertest";
import crypto from "node:crypto";

import { Channel } from "@app/entities/models";

import app from "@app/index";

import {
  responseSuccess,
  responseNotFound,
  responseAlreadyExists,
  responseNotValid,
} from "@app/constants/Response.constants";

import channelRepository from "@app/models/dataAccess/ChannelRepository.model";
import typeRepository from "@app/models/dataAccess/TypeRepository.model";
import categoryRepository from "@app/models/dataAccess/CategoryRepository.model";
import sourceRepository from "@app/models/dataAccess/SourceRepository.model";

describe("Channel.routes.ts", () => {
  const prefix = "/api/v1/channels";

  let channelType: number;
  let channelCategory: number;
  let channelSource: number;

  const channelToAdd: Pick<
    Channel,
    "name" | "description" | "thumbUrl" | "url" | "urlRest" | "number"
  > = {
    name: "",
    description: "test description",
    thumbUrl: "https://pepe.png",
    url: "https://www.youtube.com.ar",
    urlRest: "a",
    number: 999992,
  };

  const notExistsChannelType = 123123;
  const notExistsChannelCategory = 1233232;
  const notExistsChannelSource = 1233232;
  const notExistsChannelNumber = 2321312;

  const newUrl = "https://youtube.com.ar/test.liveStream";

  beforeAll(async () => {
    channelToAdd.name = crypto.randomUUID();

    const types = await typeRepository.getTypes();
    const categories = await categoryRepository.getCategories();
    const sources = await sourceRepository.getSources();

    if (!types.length || !categories.length || !sources.length)
      throw "Add types and categories firts.";

    channelType = types[0].id;
    channelCategory = categories[0].id;
    channelSource = sources[0].id;
  });

  describe("POST Add Channel", () => {
    test("It should return that no valid fields were entered.", async () => {
      const res = await request(app).post(`${prefix}/`).send({ name: "" });

      const data = res.body;
      const statusCode = res.statusCode;

      expect(statusCode).toBe(400);
      expect(data).toEqual({
        code: responseNotValid.fields.code,
      });
    });

    test("It should show that a channel type with the entered id was not found.", async () => {
      const res = await request(app).post(`${prefix}/`).send({
        name: channelToAdd.name,
        description: channelToAdd.description,
        thumbUrl: channelToAdd.thumbUrl,
        url: channelToAdd.url,
        number: channelToAdd.number,
        idType: notExistsChannelType,
        idCategory: channelCategory,
        idSource: channelSource,
      });

      const data = res.body;
      const statusCode = res.statusCode;

      expect(statusCode).toBe(404);
      expect(data).toEqual({
        code: responseNotFound.type.code,
      });
    });

    test("It should show that a channel category with the entered id was not found.", async () => {
      const res = await request(app).post(`${prefix}/`).send({
        name: channelToAdd.name,
        description: channelToAdd.description,
        thumbUrl: channelToAdd.thumbUrl,
        url: channelToAdd.url,
        number: channelToAdd.number,
        idType: channelType,
        idCategory: notExistsChannelCategory,
        idSource: channelSource,
      });

      const data = res.body;
      const statusCode = res.statusCode;

      expect(statusCode).toBe(404);
      expect(data).toEqual({
        code: responseNotFound.category.code,
      });
    });

    test("It should show that a channel source with the entered id was not found.", async () => {
      const res = await request(app).post(`${prefix}/`).send({
        name: channelToAdd.name,
        description: channelToAdd.description,
        thumbUrl: channelToAdd.thumbUrl,
        url: channelToAdd.url,
        number: channelToAdd.number,
        idType: channelType,
        idCategory: channelCategory,
        idSource: notExistsChannelSource,
      });

      const data = res.body;
      const statusCode = res.statusCode;

      expect(statusCode).toBe(404);
      expect(data).toEqual({
        code: responseNotFound.source.code,
      });
    });

    test("It must add a new channel.", async () => {
      const res = await request(app).post(`${prefix}/`).send({
        name: channelToAdd.name,
        description: channelToAdd.description,
        thumbUrl: channelToAdd.thumbUrl,
        url: channelToAdd.url,
        urlRest: channelToAdd.urlRest,
        number: channelToAdd.number,
        idType: channelType,
        idCategory: channelCategory,
        idSource: channelSource,
      });

      const data = res.body;
      const statusCode = res.statusCode;

      expect(statusCode).toBe(201);
      expect(data).toEqual({
        code: responseSuccess.addChannel.code,
        data: expect.objectContaining({
          id: expect.any(Number),
          name: channelToAdd.name,
          description: channelToAdd.description,
          thumbUrl: channelToAdd.thumbUrl,
          url: channelToAdd.url,
          urlRest: channelToAdd.urlRest,
          number: channelToAdd.number,
          type: expect.objectContaining({
            id: expect.any(Number),
            code: expect.any(String),
            description: expect.any(String),
          }),
          category: expect.objectContaining({
            id: expect.any(Number),
            code: expect.any(String),
            description: expect.any(String),
          }),
          source: expect.objectContaining({
            id: expect.any(Number),
            code: expect.any(String),
            description: expect.any(String),
          }),
        }),
      });
    });

    test("It should show that the category to be added already exists.", async () => {
      const res = await request(app).post(`${prefix}/`).send({
        name: channelToAdd.name,
        description: channelToAdd.description,
        thumbUrl: channelToAdd.thumbUrl,
        url: channelToAdd.url,
        number: channelToAdd.number,
        idType: channelType,
        idCategory: channelCategory,
        idSource: channelSource,
      });

      const data = res.body;
      const statusCode = res.statusCode;

      expect(statusCode).toBe(400);
      expect(data).toEqual({
        code: responseAlreadyExists.channel.code,
      });
    });
  });

  describe("GET Channels", () => {
    test("It must return the result success of the channels", async () => {
      const res = await request(app).get(`${prefix}/`).query({ reload: false });

      const data = res.body;
      const statusCode = res.statusCode;

      expect(statusCode).toBe(200);
      expect(data).toEqual({
        code: responseSuccess.getChannels.code,
        data: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            description: expect.any(String),
            thumbUrl: expect.any(String),
            url: expect.any(String),
            urlRest: expect.any(String),
            number: expect.any(Number),
            type: expect.objectContaining({
              id: expect.any(Number),
              code: expect.any(String),
              description: expect.any(String),
            }),
            category: expect.objectContaining({
              id: expect.any(Number),
              code: expect.any(String),
              description: expect.any(String),
            }),
            source: expect.objectContaining({
              id: expect.any(Number),
              code: expect.any(String),
              description: expect.any(String),
            }),
          }),
        ]),
      });
    });

    test("It must return the result success of the channels with url https", async () => {
      const res = await request(app).get(`${prefix}/`).query({ reload: true });

      const data = res.body;
      const statusCode = res.statusCode;

      expect(statusCode).toBe(200);
      expect(data).toEqual({
        code: responseSuccess.getChannels.code,
        data: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            description: expect.any(String),
            thumbUrl: expect.any(String),
            url: expect.stringMatching(/^https:\/\//),
            urlRest: expect.any(String),
            number: expect.any(Number),
            type: expect.objectContaining({
              id: expect.any(Number),
              code: expect.any(String),
              description: expect.any(String),
            }),
            category: expect.objectContaining({
              id: expect.any(Number),
              code: expect.any(String),
              description: expect.any(String),
            }),
            source: expect.objectContaining({
              id: expect.any(Number),
              code: expect.any(String),
              description: expect.any(String),
            }),
          }),
        ]),
      });
    });
  });

  describe("GET Channels Numbers", () => {
    test("It should return all the numbers being used as a list.", async () => {
      const res = await request(app).get(`${prefix}/numbers`);

      const data = res.body;
      const statusCode = res.statusCode;

      expect(statusCode).toBe(200);
      expect(data).toEqual({
        code: responseSuccess.getChannelsNumber.code,
        data: expect.arrayContaining([expect.any(Number)]),
      });
    });
  });

  describe("GET Channel By Number", () => {
    test("It should return that the channel entered through the number was not found.", async () => {
      const res = await request(app).get(`${prefix}/${notExistsChannelNumber}`);

      const data = res.body;
      const statusCode = res.statusCode;

      expect(statusCode).toBe(404);
      expect(data).toEqual({
        code: responseNotFound.channel.code,
      });
    });

    test("It should return the channel added by test through the channel number.", async () => {
      const res = await request(app).get(`${prefix}/${channelToAdd.number}`);

      const data = res.body;
      const statusCode = res.statusCode;

      expect(statusCode).toBe(200);
      expect(data).toEqual({
        code: responseSuccess.getChannel.code,
        data: expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          description: expect.any(String),
          thumbUrl: expect.any(String),
          url: expect.stringMatching(/^https:\/\//),
          urlRest: expect.any(String),
          number: expect.any(Number),
          type: expect.objectContaining({
            id: expect.any(Number),
            code: expect.any(String),
            description: expect.any(String),
          }),
          category: expect.objectContaining({
            id: expect.any(Number),
            code: expect.any(String),
            description: expect.any(String),
          }),
          source: expect.objectContaining({
            id: expect.any(Number),
            code: expect.any(String),
            description: expect.any(String),
          }),
        }),
      });
    });
  });

  describe("PATCH Update Channel", () => {
    const channelNotExistsId = "100";

    test("It should return that there is no channel with the entered id.", async () => {
      const res = await request(app).patch(`${prefix}/${channelNotExistsId}`);

      const data = res.body;
      const statusCode = res.statusCode;

      expect(statusCode).toBe(404);
      expect(data).toEqual({
        code: responseNotFound.channel.code,
      });
    });

    test("It must make an update of a channel with the properties entered.", async () => {
      const channel = await channelRepository.getChannelByNumber(
        channelToAdd.number
      );

      const res = await request(app)
        .patch(`${prefix}/${channel?.id}`)
        .send({ url: newUrl });

      const data = res.body;
      const statusCode = res.statusCode;

      expect(statusCode).toBe(200);
      expect(data).toEqual({
        code: responseSuccess.updateChannel.code,
        data: expect.objectContaining({
          id: expect.any(Number),
          name: channel?.name,
          description: channel?.description,
          thumbUrl: channel?.thumbUrl,
          url: newUrl,
          urlRest: channel?.urlRest,
          number: channel?.number,
          type: expect.objectContaining({
            id: expect.any(Number),
            code: expect.any(String),
            description: expect.any(String),
          }),
          category: expect.objectContaining({
            id: expect.any(Number),
            code: expect.any(String),
            description: expect.any(String),
          }),
          source: expect.objectContaining({
            id: expect.any(Number),
            code: expect.any(String),
            description: expect.any(String),
          }),
        }),
      });
    });
  });

  describe("DELETE Delete Channel", () => {
    const channelNotExistsId = "100";

    test("It should return that there is no channel with the entered id.", async () => {
      const res = await request(app).delete(`${prefix}/${channelNotExistsId}`);

      const data = res.body;
      const statusCode = res.statusCode;

      expect(statusCode).toBe(404);
      expect(data).toEqual({
        code: responseNotFound.channel.code,
      });
    });

    test("It must delete the channel entered by test.", async () => {
      const channel = await channelRepository.getChannelByNumber(
        channelToAdd.number
      );

      const res = await request(app).delete(`${prefix}/${channel?.id}`);

      const data = res.body;
      const statusCode = res.statusCode;

      expect(statusCode).toBe(200);
      expect(data).toEqual({
        code: responseSuccess.deleteChannel.code,
        data: expect.objectContaining({
          id: expect.any(Number),
          name: channel?.name,
          description: channel?.description,
          thumbUrl: channel?.thumbUrl,
          url: newUrl,
          urlRest: channel?.urlRest,
          number: channel?.number,
          type: expect.objectContaining({
            id: expect.any(Number),
            code: expect.any(String),
            description: expect.any(String),
          }),
          category: expect.objectContaining({
            id: expect.any(Number),
            code: expect.any(String),
            description: expect.any(String),
          }),
          source: expect.objectContaining({
            id: expect.any(Number),
            code: expect.any(String),
            description: expect.any(String),
          }),
        }),
      });
    });
  });
});
