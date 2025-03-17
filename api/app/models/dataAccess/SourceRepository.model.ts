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
    return await this.prisma.source.findMany();
  }

  async getSourceById(id: number): Promise<Source | null> {
    return await this.prisma.source.findUnique({
      where: { id: id },
    });
  }

  async getSourceByCode(code: string): Promise<Source | null> {
    return await this.prisma.source.findUnique({
      where: { code: code },
    });
  }

  async createSource(code: string, description: string): Promise<Source> {
    return await this.prisma.source.create({
      data: { code: code, description: description },
    });
  }

  async createSources(
    data: Pick<Source, "code" | "description">[]
  ): Promise<Prisma.BatchPayload> {
    return await this.prisma.source.createMany({ data: data });
  }

  async deleteSource(id: number): Promise<Source> {
    return await this.prisma.source.delete({ where: { id: id } });
  }
}

const sourceRepository = new SourceRepository(prisma);

export default sourceRepository;
