import { PrismaClient } from "@prisma/client";

import { Channel } from "@app/entities/models";

import prisma from "@app/database/Prisma.database";

class ChannelRepository {
  prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async getChannels(): Promise<Channel[]> {
    return await this.prisma.channel.findMany({
      include: { type: true, category: true, source: true },
      omit: { idCategory: true, idType: true, idSource: true },
    });
  }

  async getChannelById(id: number): Promise<Channel | null> {
    return await this.prisma.channel.findUnique({
      where: { id: id },
      include: { type: true, category: true, source: true },
      omit: { idCategory: true, idType: true, idSource: true },
    });
  }

  async getChannelByNumber(number: number): Promise<Channel | null> {
    return await this.prisma.channel.findUnique({
      where: { number: number },
      include: { type: true, category: true, source: true },
      omit: { idCategory: true, idType: true, idSource: true },
    });
  }

  async getChannelByNameNumber(
    name: string,
    number: number
  ): Promise<Channel | null> {
    return await this.prisma.channel.findUnique({
      where: { name: name, number: number },
      include: { type: true, category: true, source: true },
      omit: { idCategory: true, idType: true, idSource: true },
    });
  }

  async createChannel(
    name: string,
    description: string,
    thumbUrl: string,
    url: string,
    urlRest: string,
    number: number,
    idType: number,
    idCategory: number,
    idSource: number
  ): Promise<Channel> {
    return await this.prisma.channel.create({
      data: {
        name: name,
        description: description,
        thumbUrl: thumbUrl,
        url: url,
        urlRest: urlRest,
        number: number,
        idType: idType,
        idCategory: idCategory,
        idSource: idSource,
      },
      include: { type: true, category: true, source: true },
      omit: { idCategory: true, idType: true, idSource: true },
    });
  }

  async updateChannel(
    id: number,
    data: Record<string, string | number>
  ): Promise<Channel> {
    return await this.prisma.channel.update({
      where: { id: id },
      data: data,
      include: { type: true, category: true, source: true },
      omit: { idCategory: true, idType: true, idSource: true },
    });
  }

  async deleteChannel(id: number): Promise<Channel> {
    return await this.prisma.channel.delete({
      where: { id: id },
      include: { type: true, category: true, source: true },
      omit: { idCategory: true, idType: true, idSource: true },
    });
  }
}

const channelRepository = new ChannelRepository(prisma);

export default channelRepository;
