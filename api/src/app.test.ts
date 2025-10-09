import request from "supertest";
import app from "@src/app";

import {
  MESSAGES_NOT,
  MESSAGES_SUCCESS,
} from "@src/constants/messages.constant";
import { CODES_NOT, CODES_SUCCESS } from "@src/constants/codes.constant";

import { TypeService } from "@src/services/type.service";
import { CategoryService } from "@src/services/category.service";
import { SourceService } from "@src/services/source.service";
import { BaseService } from "@src/services/base.service";
import { ChannelService } from "@src/services/channel.service";

describe("app.ts", () => {
  afterAll(async () => {
    console.log("Clean up all created TEST entities.");

    const testChannel = await ChannelService.getChannelByNumber(999);
    if (testChannel) await ChannelService.deleteChannel(testChannel.id);

    const testBase = await BaseService.getBaseByIdSource(1);
    if (testBase) await BaseService.deleteBase(testBase.id);

    const testSource = await SourceService.getSourceByCode("SRC_TEST");
    if (testSource) await SourceService.deleteSource(testSource.id);

    const testType = await TypeService.getTypeByCode("TYPE_TEST");
    if (testType) await TypeService.deleteType(testType.id);

    const testCategory = await CategoryService.getCategoryByCode("CAT_TEST");
    if (testCategory) await CategoryService.deleteCategory(testCategory.id);
  });

  describe("General Routes", () => {
    const PREFIX_GENERAL = "/api/v1";

    describe(`${PREFIX_GENERAL}/INVALID_ROUTE`, () => {
      test("It should return information that the path is invalid or does not exist.", async () => {
        const response = await request(app).get(
          `${PREFIX_GENERAL}/INVALID_ROUTE`
        );

        expect(response.status).toBe(404);
        expect(response.body).toEqual({
          code: CODES_NOT.foundRoute,
          message: MESSAGES_NOT.foundRoute,
        });
      });
    });
  });

  describe("Type Route", () => {
    const PREFIX = "/api/v1/types";

    test("It must return all types.", async () => {
      const response = await request(app).get(PREFIX);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(
        expect.objectContaining({
          code: CODES_SUCCESS.getTypes,
          message: MESSAGES_SUCCESS.getTypes,
          data: expect.any(Array),
        })
      );
    });

    test("It must return that valid fields were not entered.", async () => {
      const response = await request(app).post(PREFIX).send({
        code: "",
        description: "",
      });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        code: CODES_NOT.validFields,
        message: MESSAGES_NOT.validFields,
      });
    });

    test("It must create a new type.", async () => {
      const response = await request(app)
        .post(PREFIX)
        .send({
          code: "TYPE_TEST",
          description: "Test Type",
        })
        .set("Content-Type", "application/json");

      expect(response.status).toBe(201);
      expect(response.body).toEqual(
        expect.objectContaining({
          code: CODES_SUCCESS.addType,
          message: MESSAGES_SUCCESS.addType,
          data: expect.objectContaining({
            code: "TYPE_TEST",
            description: "Test Type",
          }),
        })
      );
    });
  });

  describe("Category Route", () => {
    const PREFIX = "/api/v1/categories";

    test("It must return all categories.", async () => {
      const response = await request(app).get(PREFIX);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(
        expect.objectContaining({
          code: CODES_SUCCESS.getCategories,
          message: MESSAGES_SUCCESS.getCategories,
          data: expect.any(Array),
        })
      );
    });

    test("It must return that valid fields were not entered.", async () => {
      const response = await request(app).post(PREFIX).send({
        code: "",
        description: "",
      });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        code: CODES_NOT.validFields,
        message: MESSAGES_NOT.validFields,
      });
    });

    test("It must create a new category.", async () => {
      const response = await request(app)
        .post(PREFIX)
        .send({
          code: "CAT_TEST",
          description: "Test Category",
        })
        .set("Content-Type", "application/json");

      expect(response.status).toBe(201);
      expect(response.body).toEqual(
        expect.objectContaining({
          code: CODES_SUCCESS.addCategory,
          message: MESSAGES_SUCCESS.addCategory,
          data: expect.objectContaining({
            code: "CAT_TEST",
            description: "Test Category",
          }),
        })
      );
    });
  });

  describe("Source Route", () => {
    const PREFIX = "/api/v1/sources";

    test("It must return all sources.", async () => {
      const response = await request(app).get(PREFIX);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(
        expect.objectContaining({
          code: CODES_SUCCESS.getSources,
          message: MESSAGES_SUCCESS.getSources,
          data: expect.any(Array),
        })
      );
    });

    test("It must return that valid fields were not entered.", async () => {
      const response = await request(app).post(PREFIX).send({
        code: "",
        description: "",
      });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        code: CODES_NOT.validFields,
        message: MESSAGES_NOT.validFields,
      });
    });

    test("It must create a new source.", async () => {
      const response = await request(app)
        .post(PREFIX)
        .send({
          code: "SRC_TEST",
          description: "Test Source",
        })
        .set("Content-Type", "application/json");

      expect(response.status).toBe(201);
      expect(response.body).toEqual(
        expect.objectContaining({
          code: CODES_SUCCESS.addSource,
          message: MESSAGES_SUCCESS.addSource,
          data: expect.objectContaining({
            code: "SRC_TEST",
            description: "Test Source",
          }),
        })
      );
    });
  });

  describe("Base Route", () => {
    const PREFIX = "/api/v1/bases";

    test("It must return all bases.", async () => {
      const response = await request(app).get(PREFIX);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(
        expect.objectContaining({
          code: CODES_SUCCESS.getBases,
          message: MESSAGES_SUCCESS.getBases,
          data: expect.any(Array),
        })
      );
    });

    test("It must return that valid fields were not entered.", async () => {
      const response = await request(app).post(PREFIX).send({
        baseUrl: "",
        idSource: "",
      });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        code: CODES_NOT.validFields,
        message: MESSAGES_NOT.validFields,
      });
    });

    test("It must create a new base.", async () => {
      const source = await SourceService.getSourceByCode("SRC_TEST");

      const response = await request(app)
        .post(PREFIX)
        .send({
          baseUrl: "https://example.com/test",
          idSource: source?.id,
        })
        .set("Content-Type", "application/json");

      expect(response.status).toBe(201);
      expect(response.body).toEqual(
        expect.objectContaining({
          code: CODES_SUCCESS.addBase,
          message: MESSAGES_SUCCESS.addBase,
          data: expect.objectContaining({
            baseUrl: "https://example.com/test",
            idSource: source?.id,
          }),
        })
      );
    });
  });

  describe("Channel Route", () => {
    const PREFIX = "/api/v1/channels";

    test("It must return all channels.", async () => {
      const response = await request(app).get(PREFIX);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(
        expect.objectContaining({
          code: CODES_SUCCESS.getChannels,
          message: MESSAGES_SUCCESS.getChannels,
          data: expect.any(Array),
        })
      );
    });

    test("It must return that valid fields were not entered.", async () => {
      const response = await request(app).post(PREFIX).send({
        name: "",
        description: "",
        thumbUrl: "",
        url: "",
        urlRest: "",
        number: "",
        idType: "",
        idCategory: "",
        idSource: "",
      });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        code: CODES_NOT.validFields,
        message: MESSAGES_NOT.validFields,
      });
    });

    test("It must create a new channel.", async () => {
      const type = await TypeService.getTypeByCode("TYPE_TEST");
      const category = await CategoryService.getCategoryByCode("CAT_TEST");
      const source = await SourceService.getSourceByCode("SRC_TEST");

      const response = await request(app)
        .post(PREFIX)
        .send({
          name: "Channel Test",
          description: "This is a test channel",
          thumbUrl: "https://thumb.test/image.png",
          url: "https://example.com/stream.m3u8",
          urlRest: "https://example.com/rest",
          number: 999,
          idType: type?.id,
          idCategory: category?.id,
          idSource: source?.id,
        })
        .set("Content-Type", "application/json");

      expect(response.status).toBe(201);
      expect(response.body).toEqual(
        expect.objectContaining({
          code: CODES_SUCCESS.addChannel,
          message: MESSAGES_SUCCESS.addChannel,
          data: expect.objectContaining({
            name: "Channel Test",
            number: 999,
          }),
        })
      );
    });
  });
});
