import request from "supertest";

import { Category, Source, Type } from "@app/entities/models";

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
  let types: Pick<Type, "id" | "code" | "description">[];
  let categories: Pick<Category, "id" | "code" | "description">[];
  let sources: Pick<Source, "id" | "code" | "description">[];
  let channelType: number;
  let channelCategory: number;
  let channelSource: number;

  const name = "test";
  const description = "test description";
  const thumbUrl = "https://pepe.png";
  const url = "https://www.youtube.com.ar";
  const number = 999992;

  const prefix = "/channel/v1/channels";

  const notExistsChannelType = 123123;
  const notExistsChannelCategory = 1233232;
  const notExistsChannelSource = 1233232;

  const newUrl = "https://youtube.com.ar/test.liveStream";

  beforeAll(async () => {
    types = await typeRepository.getTypes();
    categories = await categoryRepository.getCategories();
    sources = await sourceRepository.getSources();

    if (!types.length || !categories.length || !sources.length)
      throw "Add types and categories firts.";

    channelType = types[0].id;
    channelCategory = categories[0].id;
    channelSource = sources[0].id;
  });

  describe("POST Add Channel", () => {
    test("It should return that no valid fields were entered.", async () => {
      const res = await request(app).post(`${prefix}/add`).send({ name: "" });

      const data = res.body;
      const statusCode = res.statusCode;

      expect(statusCode).toBe(400);
      expect(data).toEqual({
        code: responseNotValid.fields.code,
        message: responseNotValid.fields.message,
      });
    });

    test("It should show that a channel type with the entered id was not found.", async () => {
      const res = await request(app).post(`${prefix}/add`).send({
        name: name,
        description: description,
        thumbUrl: thumbUrl,
        url: url,
        number: number,
        idType: notExistsChannelType,
        idCategory: channelCategory,
        idSource: channelSource,
      });

      const data = res.body;
      const statusCode = res.statusCode;

      expect(statusCode).toBe(404);
      expect(data).toEqual({
        code: responseNotFound.type.code,
        message: responseNotFound.type.message,
      });
    });

    test("It should show that a channel category with the entered id was not found.", async () => {
      const res = await request(app).post(`${prefix}/add`).send({
        name: name,
        description: description,
        thumbUrl: thumbUrl,
        url: url,
        number: number,
        idType: channelType,
        idCategory: notExistsChannelCategory,
        idSource: channelSource,
      });

      const data = res.body;
      const statusCode = res.statusCode;

      expect(statusCode).toBe(404);
      expect(data).toEqual({
        code: responseNotFound.category.code,
        message: responseNotFound.category.message,
      });
    });

    test("It should show that a channel source with the entered id was not found.", async () => {
      const res = await request(app).post(`${prefix}/add`).send({
        name: name,
        description: description,
        thumbUrl: thumbUrl,
        url: url,
        number: number,
        idType: channelType,
        idCategory: channelCategory,
        idSource: notExistsChannelSource,
      });

      const data = res.body;
      const statusCode = res.statusCode;

      expect(statusCode).toBe(404);
      expect(data).toEqual({
        code: responseNotFound.source.code,
        message: responseNotFound.source.message,
      });
    });

    test("It must add a new channel.", async () => {
      const res = await request(app).post(`${prefix}/add`).send({
        name: name,
        description: description,
        thumbUrl: thumbUrl,
        url: url,
        number: number,
        idType: channelType,
        idCategory: channelCategory,
        idSource: channelSource,
      });

      const data = res.body;
      const statusCode = res.statusCode;

      expect(statusCode).toBe(201);
      expect(data).toEqual({
        code: responseSuccess.addChannel.code,
        message: responseSuccess.addChannel.message,
        data: {
          id: expect.any(Number),
          name: name,
          description: description,
          thumbUrl: thumbUrl,
          url: url,
          number: number,
          type: {
            id: expect.any(Number),
            code: expect.any(String),
            description: expect.any(String),
          },
          category: {
            id: expect.any(Number),
            code: expect.any(String),
            description: expect.any(String),
          },
          source: {
            id: expect.any(Number),
            code: expect.any(String),
            description: expect.any(String),
          },
        },
      });
    });

    test("It should show that the category to be added already exists.", async () => {
      const res = await request(app).post(`${prefix}/add`).send({
        name: name,
        description: description,
        thumbUrl: thumbUrl,
        url: url,
        number: number,
        idType: channelType,
        idCategory: channelCategory,
        idSource: channelSource,
      });

      const data = res.body;
      const statusCode = res.statusCode;

      expect(statusCode).toBe(400);
      expect(data).toEqual({
        code: responseAlreadyExists.channel.code,
        message: responseAlreadyExists.channel.message,
      });
    });
  });

  describe("GET Channels", () => {
    test("It must return the result success of the channels", async () => {
      const res = await request(app).get(`${prefix}/`);

      const data = res.body;
      const statusCode = res.statusCode;

      expect(statusCode).toBe(200);
      expect(data).toEqual({
        code: responseSuccess.getChannels.code,
        message: responseSuccess.getChannels.message,
        data: expect.arrayContaining([
          {
            id: expect.any(Number),
            name: expect.any(String),
            description: expect.any(String),
            thumbUrl: expect.any(String),
            url: expect.any(String),
            number: expect.any(Number),
            type: {
              id: expect.any(Number),
              code: expect.any(String),
              description: expect.any(String),
            },
            category: {
              id: expect.any(Number),
              code: expect.any(String),
              description: expect.any(String),
            },
            source: {
              id: expect.any(Number),
              code: expect.any(String),
              description: expect.any(String),
            },
          },
        ]),
      });
    });
  });

  describe("PATCH Update Channel", () => {
    const channelNotExistsId = "100";

    test("It should return that there is no channel with the entered id.", async () => {
      const res = await request(app).patch(
        `${prefix}/update/${channelNotExistsId}`
      );

      const data = res.body;
      const statusCode = res.statusCode;

      expect(statusCode).toBe(404);
      expect(data).toEqual({
        code: responseNotFound.channel.code,
        message: responseNotFound.channel.message,
      });
    });

    test("It must make an update of a channel with the properties entered.", async () => {
      const channels = await channelRepository.getChannels();
      const channelTest = channels.find((category) => category.name === name);

      const res = await request(app)
        .patch(`${prefix}/update/${channelTest?.id}`)
        .send({ url: newUrl });

      const data = res.body;
      const statusCode = res.statusCode;

      expect(statusCode).toBe(200);
      expect(data).toEqual({
        code: responseSuccess.updateChannel.code,
        message: responseSuccess.updateChannel.message,
        data: {
          id: expect.any(Number),
          name: name,
          description: description,
          thumbUrl: thumbUrl,
          url: newUrl,
          number: number,
          type: {
            id: expect.any(Number),
            code: expect.any(String),
            description: expect.any(String),
          },
          category: {
            id: expect.any(Number),
            code: expect.any(String),
            description: expect.any(String),
          },
          source: {
            id: expect.any(Number),
            code: expect.any(String),
            description: expect.any(String),
          },
        },
      });
    });
  });

  describe("DELETE Delete Channel", () => {
    const channelNotExistsId = "100";

    test("It should return that there is no channel with the entered id.", async () => {
      const res = await request(app).delete(
        `${prefix}/delete/${channelNotExistsId}`
      );

      const data = res.body;
      const statusCode = res.statusCode;

      expect(statusCode).toBe(404);
      expect(data).toEqual({
        code: responseNotFound.channel.code,
        message: responseNotFound.channel.message,
      });
    });

    test("It must delete the channel entered by test.", async () => {
      const channels = await channelRepository.getChannels();
      const channelTest = channels.find((category) => category.name === name);

      const res = await request(app).delete(
        `${prefix}/delete/${channelTest?.id}`
      );

      const data = res.body;
      const statusCode = res.statusCode;

      expect(statusCode).toBe(200);
      expect(data).toEqual({
        code: responseSuccess.deleteChannel.code,
        message: responseSuccess.deleteChannel.message,
        data: {
          id: expect.any(Number),
          name: name,
          description: description,
          thumbUrl: thumbUrl,
          url: newUrl,
          number: number,
          type: {
            id: expect.any(Number),
            code: expect.any(String),
            description: expect.any(String),
          },
          category: {
            id: expect.any(Number),
            code: expect.any(String),
            description: expect.any(String),
          },
          source: {
            id: expect.any(Number),
            code: expect.any(String),
            description: expect.any(String),
          },
        },
      });
    });
  });
});
