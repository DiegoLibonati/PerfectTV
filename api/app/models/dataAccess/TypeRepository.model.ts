import { PrismaClient } from "@prisma/client";

import { Type } from "@app/entities/models";

import prisma from "@app/database/Prisma.database";

class TypeRepository {
  prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async getTypes(): Promise<Type[]> {
    return await this.prisma.type.findMany();
  }

  async getTypeById(id: number): Promise<Type | null> {
    return await this.prisma.type.findUnique({
      where: { id: id },
    });
  }

  async getTypeByCode(code: string): Promise<Type | null> {
    return await this.prisma.type.findUnique({
      where: { code: code },
    });
  }

  async createType(code: string, description: string): Promise<Type> {
    return await this.prisma.type.create({
      data: { code: code, description: description },
    });
  }

  async createTypes(
    data: Pick<Type, "code" | "description">[]
  ): Promise<{ count: number }> {
    return await this.prisma.type.createMany({ data: data });
  }

  async deleteType(id: number): Promise<Type> {
    return await this.prisma.type.delete({ where: { id: id } });
  }
}

const typeRepository = new TypeRepository(prisma);

export default typeRepository;
