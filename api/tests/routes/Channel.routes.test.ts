import request from "supertest";

import { Category, Type } from "@app/entities/models";

import app from "@app/index";
import { responseConstants } from "@app/constants/Response.constants";
import prisma from "@app/database/Prisma.database";

describe("Channel.routes.ts", () => {
  let types: Pick<Type, "id" | "name">[];
  let categories: Pick<Category, "id" | "name">[];
  let channelType: number;
  let channelCategory: number;

  const name = "test";
  const description = "test description";
  const thumbUrl = "https://pepe.png";
  const url = "https://www.youtube.com.ar";
  const number = 1000;

  const prefix = "/channel/v1/channels";

  const notExistsChannelType = 123123;
  const notExistsChannelCategory = 1233232;

  beforeAll(async () => {
    types = await prisma.type.findMany();
    categories = await prisma.category.findMany();

    if (types.length === 0 || categories.length === 0)
      throw "Add types and categories firts.";

    channelType = types[0].id;
    channelCategory = categories[0].id;
  });

  describe("POST Add Channel", () => {
    test("It should return that no valid fields were entered.", async () => {
      const res = await request(app).post(`${prefix}/add`).send({ name: "" });

      const data = res.body;
      const statusCode = res.statusCode;

      expect(statusCode).toBe(400);
      expect(data).toEqual({
        code: responseConstants.notValidFields.code,
        message: responseConstants.notValidFields.message,
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
      });

      const data = res.body;
      const statusCode = res.statusCode;

      expect(statusCode).toBe(404);
      expect(data).toEqual({
        code: responseConstants.notFoundType.code,
        message: responseConstants.notFoundType.message,
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
      });

      const data = res.body;
      const statusCode = res.statusCode;

      expect(statusCode).toBe(404);
      expect(data).toEqual({
        code: responseConstants.notFoundCategory.code,
        message: responseConstants.notFoundCategory.message,
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
      });

      const data = res.body;
      const statusCode = res.statusCode;

      expect(statusCode).toBe(201);
      expect(data).toEqual({
        code: responseConstants.successAddChannel.code,
        message: responseConstants.successAddChannel.message,
        data: {
          id: expect.any(Number),
          name: name,
          description: description,
          thumbUrl: thumbUrl,
          url: url,
          number: number,
          idType: channelType,
          idCategory: channelCategory,
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
      });

      const data = res.body;
      const statusCode = res.statusCode;

      expect(statusCode).toBe(400);
      expect(data).toEqual({
        code: responseConstants.alreadyExistsChannel.code,
        message: responseConstants.alreadyExistsChannel.message,
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
        code: responseConstants.successGetChannels.code,
        message: responseConstants.successGetChannels.message,
        data: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            description: expect.any(String),
            thumbUrl: expect.any(String),
            url: expect.any(String),
            number: expect.any(Number),
            idType: expect.any(Number),
            idCategory: expect.any(Number),
          }),
        ]),
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
        code: responseConstants.notFoundChannel.code,
        message: responseConstants.notFoundChannel.message,
      });
    });

    test("It must delete the channel entered by test.", async () => {
      const channels = await prisma.channel.findMany();
      const channelTest = channels.find((category) => category.name === name);

      const res = await request(app).delete(
        `${prefix}/delete/${channelTest?.id}`
      );

      const data = res.body;
      const statusCode = res.statusCode;

      expect(statusCode).toBe(200);
      expect(data).toEqual({
        code: responseConstants.successDeleteChannel.code,
        message: responseConstants.successDeleteChannel.message,
        data: {
          id: expect.any(Number),
          name: name,
          description: description,
          thumbUrl: thumbUrl,
          url: url,
          number: number,
          idType: channelType,
          idCategory: channelCategory,
        },
      });
    });
  });
});
