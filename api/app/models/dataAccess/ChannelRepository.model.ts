import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

import { Channel } from "@app/entities/models";

import prisma from "@app/database/Prisma.database";

class ChannelRepository {
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;

  constructor(
    prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
  ) {
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

  async getChannelByNameNumberUrl(
    name: string,
    number: number,
    url: string
  ): Promise<Channel | null> {
    return await this.prisma.channel.findUnique({
      where: { name: name, number: number, url: url },
      include: { type: true, category: true, source: true },
      omit: { idCategory: true, idType: true, idSource: true },
    });
  }

  async createChannel(
    name: string,
    description: string,
    thumbUrl: string,
    url: string,
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
