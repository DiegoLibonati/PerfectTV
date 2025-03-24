import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

import { Source } from "@app/entities/models";

import prisma from "@app/database/Prisma.database";

class SourceRepository {
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;

  constructor(
    prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
  ) {
    this.prisma = prisma;
  }

  async getSources(): Promise<Source[]> {
    return await this.prisma.source.findMany({ include: { base: true } });
  }

  async getSourceById(id: number): Promise<Source | null> {
    return await this.prisma.source.findUnique({
      where: { id: id },
      include: { base: true },
    });
  }

  async getSourceByCode(code: string): Promise<Source | null> {
    return await this.prisma.source.findUnique({
      where: { code: code },
      include: { base: true },
    });
  }

  async createSource(code: string, description: string): Promise<Source> {
    return await this.prisma.source.create({
      data: { code: code, description: description },
      include: { base: true },
    });
  }

  async createSources(
    data: Pick<Source, "code" | "description">[]
  ): Promise<Prisma.BatchPayload> {
    return await this.prisma.source.createMany({ data: data });
  }

  async deleteSource(id: number): Promise<Source> {
    return await this.prisma.source.delete({
      where: { id: id },
      include: { base: true },
    });
  }
}

const sourceRepository = new SourceRepository(prisma);

export default sourceRepository;
