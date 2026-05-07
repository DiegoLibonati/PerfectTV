import request from "supertest";
import axios from "axios";

import type { Response } from "supertest";
import type { Channel, Category } from "@/types/app";
import type { ResponseWithData } from "@/types/responses";

import app from "@/app";

import { mockChannel } from "@tests/__mocks__/channel.mock";
import { mockCategory } from "@tests/__mocks__/category.mock";

const mockAxios = axios as jest.Mocked<typeof axios>;
const CHANNELS_QUERY = `
  query {
    channels {
      code
      message
      data {
        id
        name
        number
      }
    }
  }
`;
const CATEGORIES_QUERY = `
  query {
    categories {
      code
      message
      data {
        id
        code
        description
      }
    }
  }
`;
const CHANNEL_QUERY = `
  query GetChannel($number: Int!, $reload: Boolean) {
    channel(number: $number, reload: $reload) {
      code
      message
      data {
        id
        name
        number
      }
    }
  }
`;
const NUMBERS_QUERY = `
  query {
    numbers {
      code
      message
      data
    }
  }
`;

jest.mock("@/configs/env.config", () => ({
  envs: { API_URL: "http://test-api.com" },
}));
jest.mock("axios");

describe("graphql", () => {
  describe("query channels", () => {
    it("should return channels data from the external API", async () => {
      const mockResponse: ResponseWithData<Channel[]> = {
        code: "SUCCESS",
        message: "ok",
        data: [mockChannel],
      };
      mockAxios.get.mockResolvedValue({ data: mockResponse });

      const response: Response = await request(app)
        .post("/graphql")
        .send({ query: CHANNELS_QUERY })
        .set("Content-Type", "application/json");

      expect(response.status).toBe(200);
      expect(response.body.errors).toBeUndefined();
      expect(response.body.data.channels.code).toBe("SUCCESS");
      expect(response.body.data.channels.data).toHaveLength(1);
      expect(response.body.data.channels.data[0].number).toBe(5);
    });

    it("should return empty data array when there are no channels", async () => {
      const mockResponse: ResponseWithData<Channel[]> = {
        code: "SUCCESS",
        message: "ok",
        data: [],
      };
      mockAxios.get.mockResolvedValue({ data: mockResponse });

      const response: Response = await request(app)
        .post("/graphql")
        .send({ query: CHANNELS_QUERY })
        .set("Content-Type", "application/json");

      expect(response.status).toBe(200);
      expect(response.body.errors).toBeUndefined();
      expect(response.body.data.channels.data).toEqual([]);
    });

    it("should return errors when the external API call fails", async () => {
      mockAxios.get.mockRejectedValue(new Error("network error"));

      const response: Response = await request(app)
        .post("/graphql")
        .send({ query: CHANNELS_QUERY })
        .set("Content-Type", "application/json");

      expect(response.status).toBe(200);
      expect(response.body.errors).toBeDefined();
      expect(response.body.errors[0].message).toContain("network error");
    });
  });

  describe("query categories", () => {
    it("should return categories data from the external API", async () => {
      const mockResponse: ResponseWithData<Category[]> = {
        code: "SUCCESS",
        message: "ok",
        data: [mockCategory],
      };
      mockAxios.get.mockResolvedValue({ data: mockResponse });

      const response: Response = await request(app)
        .post("/graphql")
        .send({ query: CATEGORIES_QUERY })
        .set("Content-Type", "application/json");

      expect(response.status).toBe(200);
      expect(response.body.errors).toBeUndefined();
      expect(response.body.data.categories.data).toHaveLength(1);
      expect(response.body.data.categories.data[0].code).toBe("sports");
    });

    it("should return errors when the external API call fails", async () => {
      mockAxios.get.mockRejectedValue(new Error("service unavailable"));

      const response: Response = await request(app)
        .post("/graphql")
        .send({ query: CATEGORIES_QUERY })
        .set("Content-Type", "application/json");

      expect(response.status).toBe(200);
      expect(response.body.errors).toBeDefined();
    });
  });

  describe("query channel", () => {
    it("should return the channel for a given number", async () => {
      const mockResponse: ResponseWithData<Channel> = {
        code: "SUCCESS",
        message: "ok",
        data: mockChannel,
      };
      mockAxios.get.mockResolvedValue({ data: mockResponse });

      const response: Response = await request(app)
        .post("/graphql")
        .send({ query: CHANNEL_QUERY, variables: { number: 5 } })
        .set("Content-Type", "application/json");

      expect(response.status).toBe(200);
      expect(response.body.errors).toBeUndefined();
      expect(response.body.data.channel.data.number).toBe(5);
      expect(response.body.data.channel.data.name).toBe("Canal 5");
    });

    it("should pass the reload variable to the resolver", async () => {
      const mockResponse: ResponseWithData<Channel> = {
        code: "SUCCESS",
        message: "ok",
        data: mockChannel,
      };
      mockAxios.get.mockResolvedValue({ data: mockResponse });

      const response: Response = await request(app)
        .post("/graphql")
        .send({ query: CHANNEL_QUERY, variables: { number: 5, reload: true } })
        .set("Content-Type", "application/json");

      expect(response.status).toBe(200);
      expect(response.body.errors).toBeUndefined();
      expect(mockAxios.get).toHaveBeenCalledWith(
        expect.stringContaining("/channels/5"),
        expect.objectContaining({ params: expect.objectContaining({ reload: true }) }),
      );
    });

    it("should return errors when the external API call fails", async () => {
      mockAxios.get.mockRejectedValue(new Error("channel not found"));

      const response: Response = await request(app)
        .post("/graphql")
        .send({ query: CHANNEL_QUERY, variables: { number: 999 } })
        .set("Content-Type", "application/json");

      expect(response.status).toBe(200);
      expect(response.body.errors).toBeDefined();
      expect(response.body.errors[0].message).toContain("channel not found");
    });

    it("should return errors when number argument is wrong type", async () => {
      const response: Response = await request(app)
        .post("/graphql")
        .send({ query: CHANNEL_QUERY, variables: { number: "not-a-number" } })
        .set("Content-Type", "application/json");

      expect(response.body.errors).toBeDefined();
    });
  });

  describe("query numbers", () => {
    it("should return the list of channel numbers", async () => {
      const mockResponse: ResponseWithData<number[]> = {
        code: "SUCCESS",
        message: "ok",
        data: [1, 2, 3, 5, 7],
      };
      mockAxios.get.mockResolvedValue({ data: mockResponse });

      const response: Response = await request(app)
        .post("/graphql")
        .send({ query: NUMBERS_QUERY })
        .set("Content-Type", "application/json");

      expect(response.status).toBe(200);
      expect(response.body.errors).toBeUndefined();
      expect(response.body.data.numbers.data).toEqual([1, 2, 3, 5, 7]);
    });

    it("should return empty data array when there are no numbers", async () => {
      const mockResponse: ResponseWithData<number[]> = {
        code: "SUCCESS",
        message: "ok",
        data: [],
      };
      mockAxios.get.mockResolvedValue({ data: mockResponse });

      const response: Response = await request(app)
        .post("/graphql")
        .send({ query: NUMBERS_QUERY })
        .set("Content-Type", "application/json");

      expect(response.status).toBe(200);
      expect(response.body.errors).toBeUndefined();
      expect(response.body.data.numbers.data).toEqual([]);
    });

    it("should return errors when the external API call fails", async () => {
      mockAxios.get.mockRejectedValue(new Error("server error"));

      const response: Response = await request(app)
        .post("/graphql")
        .send({ query: NUMBERS_QUERY })
        .set("Content-Type", "application/json");

      expect(response.status).toBe(200);
      expect(response.body.errors).toBeDefined();
    });
  });
});
