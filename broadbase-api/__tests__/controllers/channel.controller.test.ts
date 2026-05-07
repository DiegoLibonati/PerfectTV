import type { Request, Response } from "express";
import type { ChannelWithRelations } from "@/types/app";

import { ChannelController } from "@/controllers/channel.controller";

import { ChannelService } from "@/services/channel.service";
import { SourceService } from "@/services/source.service";
import { BaseService } from "@/services/base.service";
import { TypeService } from "@/services/type.service";
import { CategoryService } from "@/services/category.service";

import { mockChannelWithRealations } from "@tests/__mocks__/channel.mock";
import { mockSourceWithRelations } from "@tests/__mocks__/source.mock";
import { mockBaseWithRelations } from "@tests/__mocks__/base.mock";
import { mockType } from "@tests/__mocks__/type.mock";
import { mockCategory } from "@tests/__mocks__/category.mock";

jest.mock("@/services/channel.service");
jest.mock("@/services/source.service");
jest.mock("@/services/base.service");
jest.mock("@/services/type.service");
jest.mock("@/services/category.service");

const buildReq = <
  P extends Record<string, string> = Record<string, string>,
  B extends object = object,
>(
  overrides: { params?: P; body?: B; query?: Record<string, string> } = {}
): Request<P, object, B> =>
  ({ params: {} as P, query: {}, body: {} as B, ...overrides }) as unknown as Request<P, object, B>;

const buildRes = (): Response => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res as Response;
};

describe("channel.controller", () => {
  describe("getChannels", () => {
    it("should return 200 with channels when called without reload", async () => {
      (ChannelService.getAllChannels as jest.Mock).mockResolvedValue([mockChannelWithRealations]);
      const req = buildReq({ query: {} });
      const res: Response = buildRes();

      await ChannelController.getChannels(req, res);

      expect(ChannelService.getAllChannels).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ data: [mockChannelWithRealations] })
      );
    });

    it("should return 200 with channels when called with reload and URLs are current", async () => {
      (ChannelService.getAllChannels as jest.Mock).mockResolvedValue([mockChannelWithRealations]);
      (SourceService.getAllSources as jest.Mock).mockResolvedValue([mockSourceWithRelations]);
      (BaseService.getBaseByIdSource as jest.Mock).mockResolvedValue(mockBaseWithRelations);
      const req = buildReq({ query: { reload: "true" } });
      const res: Response = buildRes();

      await ChannelController.getChannels(req, res);

      expect(ChannelService.getAllChannels).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
    });

    it("should return 500 when service throws", async () => {
      (ChannelService.getAllChannels as jest.Mock).mockRejectedValue(new Error("DB error"));
      const req = buildReq();
      const res: Response = buildRes();

      await ChannelController.getChannels(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe("getChannelByNumber", () => {
    it("should return 200 with channel when URL is valid and no reload", async () => {
      (ChannelService.getChannelByNumber as jest.Mock).mockResolvedValue(mockChannelWithRealations);
      (BaseService.getBaseByIdSource as jest.Mock).mockResolvedValue(mockBaseWithRelations);
      const req = buildReq<{ number: string }>({ params: { number: "1" }, query: {} });
      const res: Response = buildRes();

      await ChannelController.getChannelByNumber(req, res);

      expect(ChannelService.getChannelByNumber).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ data: mockChannelWithRealations })
      );
    });

    it("should update URL and return 200 when URL is invalid and no reload", async () => {
      const channelWithInvalidUrl: ChannelWithRelations = {
        ...mockChannelWithRealations,
        url: "/channel?channel=abc",
        urlRest: "?channel=abc",
      };
      const updatedChannel: ChannelWithRelations = {
        ...channelWithInvalidUrl,
        url: "https://www.youtube.com/embed/live_stream?channel=abc",
      };
      (ChannelService.getChannelByNumber as jest.Mock).mockResolvedValue(channelWithInvalidUrl);
      (BaseService.getBaseByIdSource as jest.Mock).mockResolvedValue(mockBaseWithRelations);
      (ChannelService.updateChannel as jest.Mock).mockResolvedValue(updatedChannel);
      const req = buildReq<{ number: string }>({ params: { number: "1" }, query: {} });
      const res: Response = buildRes();

      await ChannelController.getChannelByNumber(req, res);

      expect(ChannelService.updateChannel).toHaveBeenCalledWith(1, {
        url: "https://www.youtube.com/embed/live_stream?channel=abc",
      });
      expect(res.status).toHaveBeenCalledWith(200);
    });

    it("should return 404 when channel is not found", async () => {
      (ChannelService.getChannelByNumber as jest.Mock).mockResolvedValue(null);
      const req = buildReq<{ number: string }>({ params: { number: "999" }, query: {} });
      const res: Response = buildRes();

      await ChannelController.getChannelByNumber(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });

    it("should return 400 when number param is missing", async () => {
      const req = buildReq<{ number: string }>({ query: {} });
      const res: Response = buildRes();

      await ChannelController.getChannelByNumber(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(ChannelService.getChannelByNumber).not.toHaveBeenCalled();
    });

    it("should return 500 when service throws", async () => {
      (ChannelService.getChannelByNumber as jest.Mock).mockRejectedValue(new Error("DB error"));
      const req = buildReq<{ number: string }>({ params: { number: "1" }, query: {} });
      const res: Response = buildRes();

      await ChannelController.getChannelByNumber(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe("addChannel", () => {
    const validBody = {
      name: "New Channel",
      description: "A new channel",
      thumbUrl: "https://example.com/thumb.jpg",
      url: "https://example.com/stream",
      urlRest: null,
      number: 2,
      idType: 1,
      idCategory: 1,
      idSource: 1,
    };

    it("should return 201 when channel is created", async () => {
      (ChannelService.getChannelByNameAndNumber as jest.Mock).mockResolvedValue(null);
      (TypeService.getTypeById as jest.Mock).mockResolvedValue(mockType);
      (CategoryService.getCategoryById as jest.Mock).mockResolvedValue(mockCategory);
      (SourceService.getSourceById as jest.Mock).mockResolvedValue(mockSourceWithRelations);
      (ChannelService.createChannel as jest.Mock).mockResolvedValue(mockChannelWithRealations);
      const req = buildReq({ body: validBody });
      const res: Response = buildRes();

      await ChannelController.addChannel(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ data: mockChannelWithRealations })
      );
    });

    it("should return 400 when required fields are missing", async () => {
      const req = buildReq({ body: { name: "Channel" } });
      const res: Response = buildRes();

      await ChannelController.addChannel(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(ChannelService.createChannel).not.toHaveBeenCalled();
    });

    it("should return 400 when channel already exists", async () => {
      (ChannelService.getChannelByNameAndNumber as jest.Mock).mockResolvedValue(
        mockChannelWithRealations
      );
      const req = buildReq({ body: validBody });
      const res: Response = buildRes();

      await ChannelController.addChannel(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(ChannelService.createChannel).not.toHaveBeenCalled();
    });

    it("should return 404 when type does not exist", async () => {
      (ChannelService.getChannelByNameAndNumber as jest.Mock).mockResolvedValue(null);
      (TypeService.getTypeById as jest.Mock).mockResolvedValue(null);
      const req = buildReq({ body: validBody });
      const res: Response = buildRes();

      await ChannelController.addChannel(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(ChannelService.createChannel).not.toHaveBeenCalled();
    });

    it("should return 404 when category does not exist", async () => {
      (ChannelService.getChannelByNameAndNumber as jest.Mock).mockResolvedValue(null);
      (TypeService.getTypeById as jest.Mock).mockResolvedValue(mockType);
      (CategoryService.getCategoryById as jest.Mock).mockResolvedValue(null);
      const req = buildReq({ body: validBody });
      const res: Response = buildRes();

      await ChannelController.addChannel(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(ChannelService.createChannel).not.toHaveBeenCalled();
    });

    it("should return 404 when source does not exist", async () => {
      (ChannelService.getChannelByNameAndNumber as jest.Mock).mockResolvedValue(null);
      (TypeService.getTypeById as jest.Mock).mockResolvedValue(mockType);
      (CategoryService.getCategoryById as jest.Mock).mockResolvedValue(mockCategory);
      (SourceService.getSourceById as jest.Mock).mockResolvedValue(null);
      const req = buildReq({ body: validBody });
      const res: Response = buildRes();

      await ChannelController.addChannel(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(ChannelService.createChannel).not.toHaveBeenCalled();
    });

    it("should return 500 when service throws", async () => {
      (ChannelService.getChannelByNameAndNumber as jest.Mock).mockRejectedValue(
        new Error("DB error")
      );
      const req = buildReq({ body: validBody });
      const res: Response = buildRes();

      await ChannelController.addChannel(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe("updateChannel", () => {
    it("should return 200 when channel is updated", async () => {
      const updatedChannel: ChannelWithRelations = {
        ...mockChannelWithRealations,
        name: "Updated",
      };
      (ChannelService.getChannelById as jest.Mock).mockResolvedValue(mockChannelWithRealations);
      (ChannelService.updateChannel as jest.Mock).mockResolvedValue(updatedChannel);
      const req = buildReq<{ id: string }>({ params: { id: "1" }, body: { name: "Updated" } });
      const res: Response = buildRes();

      await ChannelController.updateChannel(req, res);

      expect(ChannelService.getChannelById).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ data: updatedChannel }));
    });

    it("should return 404 when channel does not exist", async () => {
      (ChannelService.getChannelById as jest.Mock).mockResolvedValue(null);
      const req = buildReq<{ id: string }>({ params: { id: "999" }, body: { name: "Updated" } });
      const res: Response = buildRes();

      await ChannelController.updateChannel(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(ChannelService.updateChannel).not.toHaveBeenCalled();
    });

    it("should return 500 when service throws", async () => {
      (ChannelService.getChannelById as jest.Mock).mockRejectedValue(new Error("DB error"));
      const req = buildReq<{ id: string }>({ params: { id: "1" } });
      const res: Response = buildRes();

      await ChannelController.updateChannel(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe("deleteChannel", () => {
    it("should return 200 when channel is deleted", async () => {
      (ChannelService.getChannelById as jest.Mock).mockResolvedValue(mockChannelWithRealations);
      (ChannelService.deleteChannel as jest.Mock).mockResolvedValue(mockChannelWithRealations);
      const req = buildReq<{ id: string }>({ params: { id: "1" } });
      const res: Response = buildRes();

      await ChannelController.deleteChannel(req, res);

      expect(ChannelService.getChannelById).toHaveBeenCalledWith(1);
      expect(ChannelService.deleteChannel).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ data: mockChannelWithRealations })
      );
    });

    it("should return 404 when channel does not exist", async () => {
      (ChannelService.getChannelById as jest.Mock).mockResolvedValue(null);
      const req = buildReq<{ id: string }>({ params: { id: "999" } });
      const res: Response = buildRes();

      await ChannelController.deleteChannel(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(ChannelService.deleteChannel).not.toHaveBeenCalled();
    });

    it("should return 500 when service throws", async () => {
      (ChannelService.getChannelById as jest.Mock).mockRejectedValue(new Error("DB error"));
      const req = buildReq<{ id: string }>({ params: { id: "1" } });
      const res: Response = buildRes();

      await ChannelController.deleteChannel(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe("getChannelsNumber", () => {
    it("should return 200 with sorted channel numbers", async () => {
      const channels: ChannelWithRelations[] = [
        { ...mockChannelWithRealations, number: 3 },
        { ...mockChannelWithRealations, id: 2, name: "Channel 2", number: 1 },
        { ...mockChannelWithRealations, id: 3, name: "Channel 3", number: 2 },
      ];
      (ChannelService.getAllChannels as jest.Mock).mockResolvedValue(channels);
      const req = buildReq();
      const res: Response = buildRes();

      await ChannelController.getChannelsNumber(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ data: [1, 2, 3] }));
    });

    it("should return 200 with empty array when no channels", async () => {
      (ChannelService.getAllChannels as jest.Mock).mockResolvedValue([]);
      const req = buildReq();
      const res: Response = buildRes();

      await ChannelController.getChannelsNumber(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ data: [] }));
    });

    it("should return 500 when service throws", async () => {
      (ChannelService.getAllChannels as jest.Mock).mockRejectedValue(new Error("DB error"));
      const req = buildReq();
      const res: Response = buildRes();

      await ChannelController.getChannelsNumber(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
});
