import axios from "axios";

import type { Channel, Category } from "@/types/app";
import type { ChannelsArgs, ChannelArgs } from "@/types/args";
import type { ResponseWithData } from "@/types/responses";

import { QueryResolver } from "@/resolvers/query.resolver";

import { mockChannel } from "@tests/__mocks__/channel.mock";
import { mockCategory } from "@tests/__mocks__/category.mock";

const mockAxios = axios as jest.Mocked<typeof axios>;

jest.mock("@/configs/env.config", () => ({
  envs: { API_URL: "http://test-api.com" },
}));
jest.mock("axios");

describe("query.resolver", () => {
  describe("channels", () => {
    it("should call axios.get with the channels URL and params", async () => {
      const mockData: ResponseWithData<Channel[]> = {
        code: "SUCCESS",
        message: "ok",
        data: [mockChannel],
      };
      mockAxios.get.mockResolvedValue({ data: mockData });

      const args: ChannelsArgs = { reload: false };
      await QueryResolver.channels(null, args);

      expect(mockAxios.get).toHaveBeenCalledWith("http://test-api.com/channels", { params: args });
      expect(mockAxios.get).toHaveBeenCalledTimes(1);
    });

    it("should return the data from the axios response", async () => {
      const mockData: ResponseWithData<Channel[]> = {
        code: "SUCCESS",
        message: "ok",
        data: [mockChannel],
      };
      mockAxios.get.mockResolvedValue({ data: mockData });

      const result: ResponseWithData<Channel[]> = await QueryResolver.channels(null, {});

      expect(result).toEqual(mockData);
    });

    it("should return empty data array when the response has no channels", async () => {
      const mockData: ResponseWithData<Channel[]> = {
        code: "SUCCESS",
        message: "ok",
        data: [],
      };
      mockAxios.get.mockResolvedValue({ data: mockData });

      const result: ResponseWithData<Channel[]> = await QueryResolver.channels(null, {});

      expect(result.data).toEqual([]);
    });

    it("should propagate errors from axios", async () => {
      mockAxios.get.mockRejectedValue(new Error("network error"));

      await expect(QueryResolver.channels(null, {})).rejects.toThrow("network error");
    });
  });

  describe("categories", () => {
    it("should call axios.get with the categories URL", async () => {
      const mockData: ResponseWithData<Category[]> = {
        code: "SUCCESS",
        message: "ok",
        data: [mockCategory],
      };
      mockAxios.get.mockResolvedValue({ data: mockData });

      await QueryResolver.categories();

      expect(mockAxios.get).toHaveBeenCalledWith("http://test-api.com/categories");
      expect(mockAxios.get).toHaveBeenCalledTimes(1);
    });

    it("should return the data from the axios response", async () => {
      const mockData: ResponseWithData<Category[]> = {
        code: "SUCCESS",
        message: "ok",
        data: [mockCategory],
      };
      mockAxios.get.mockResolvedValue({ data: mockData });

      const result: ResponseWithData<Category[]> = await QueryResolver.categories();

      expect(result).toEqual(mockData);
    });

    it("should propagate errors from axios", async () => {
      mockAxios.get.mockRejectedValue(new Error("service unavailable"));

      await expect(QueryResolver.categories()).rejects.toThrow("service unavailable");
    });
  });

  describe("channel", () => {
    it("should call axios.get with the channel URL and reload param", async () => {
      const mockData: ResponseWithData<Channel> = {
        code: "SUCCESS",
        message: "ok",
        data: mockChannel,
      };
      mockAxios.get.mockResolvedValue({ data: mockData });

      const args: ChannelArgs = { number: 1, reload: true };
      await QueryResolver.channel(null, args);

      expect(mockAxios.get).toHaveBeenCalledWith("http://test-api.com/channels/1", {
        params: { reload: true },
      });
      expect(mockAxios.get).toHaveBeenCalledTimes(1);
    });

    it("should return the data from the axios response", async () => {
      const mockData: ResponseWithData<Channel> = {
        code: "SUCCESS",
        message: "ok",
        data: mockChannel,
      };
      mockAxios.get.mockResolvedValue({ data: mockData });

      const result: ResponseWithData<Channel> = await QueryResolver.channel(null, { number: 1 });

      expect(result).toEqual(mockData);
    });

    it("should pass undefined reload when not provided in args", async () => {
      const mockData: ResponseWithData<Channel> = {
        code: "SUCCESS",
        message: "ok",
        data: mockChannel,
      };
      mockAxios.get.mockResolvedValue({ data: mockData });

      await QueryResolver.channel(null, { number: 5 });

      expect(mockAxios.get).toHaveBeenCalledWith("http://test-api.com/channels/5", {
        params: { reload: undefined },
      });
    });

    it("should propagate errors from axios", async () => {
      mockAxios.get.mockRejectedValue(new Error("channel not found"));

      await expect(QueryResolver.channel(null, { number: 999 })).rejects.toThrow(
        "channel not found",
      );
    });
  });

  describe("numbers", () => {
    it("should call axios.get with the channel numbers URL", async () => {
      const mockData: ResponseWithData<number[]> = {
        code: "SUCCESS",
        message: "ok",
        data: [1, 2, 3],
      };
      mockAxios.get.mockResolvedValue({ data: mockData });

      await QueryResolver.numbers(null);

      expect(mockAxios.get).toHaveBeenCalledWith("http://test-api.com/channels/numbers");
      expect(mockAxios.get).toHaveBeenCalledTimes(1);
    });

    it("should return the data from the axios response", async () => {
      const mockData: ResponseWithData<number[]> = {
        code: "SUCCESS",
        message: "ok",
        data: [1, 2, 3, 5, 7],
      };
      mockAxios.get.mockResolvedValue({ data: mockData });

      const result: ResponseWithData<number[]> = await QueryResolver.numbers(null);

      expect(result).toEqual(mockData);
    });

    it("should propagate errors from axios", async () => {
      mockAxios.get.mockRejectedValue(new Error("server error"));

      await expect(QueryResolver.numbers(null)).rejects.toThrow("server error");
    });
  });
});
