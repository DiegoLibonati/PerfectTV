import { PrismaClient } from "@prisma/client";

import { Base } from "@app/entities/models";

import prisma from "@app/database/Prisma.database";

class BaseRepository {
  prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async getBases(): Promise<Base[]> {
    return await this.prisma.base.findMany({
      include: { source: true },
      omit: { idSource: true },
    });
  }

  async getBaseById(id: number): Promise<Base | null> {
    return await this.prisma.base.findUnique({
      where: { id: id },
      include: { source: true },
      omit: { idSource: true },
    });
  }

  async getBaseByIdSource(idSource: number): Promise<Base | null> {
    return await this.prisma.base.findUnique({
      where: { idSource: idSource },
      include: { source: true },
      omit: { idSource: true },
    });
  }

  async createBase(baseUrl: string, idSource: number): Promise<Base> {
    return await this.prisma.base.create({
      data: { baseUrl: baseUrl, idSource: idSource },
      include: { source: true },
      omit: { idSource: true },
    });
  }

  async createBases(
    data: (Pick<Base, "baseUrl"> & { idSource: number })[]
  ): Promise<{ count: number }> {
    return await this.prisma.base.createMany({ data: data });
  }

  async updateBase(
    id: number,
    data: Record<string, string | number>
  ): Promise<Base> {
    return await this.prisma.base.update({
      where: { id: id },
      data: data,
      include: { source: true },
      omit: { idSource: true },
    });
  }

  async deleteBase(id: number): Promise<Base> {
    return await this.prisma.base.delete({
      where: { id: id },
      include: { source: true },
      omit: { idSource: true },
    });
  }
}

const baseRepository = new BaseRepository(prisma);

export default baseRepository;
