import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

import { Category } from "@app/entities/models";

import prisma from "@app/database/Prisma.database";

class CategoryRepository {
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;

  constructor(
    prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
  ) {
    this.prisma = prisma;
  }

  async getCategories(): Promise<Category[]> {
    return await this.prisma.category.findMany({ include: { channels: true } });
  }

  async getCategoryById(id: number): Promise<Category | null> {
    return await this.prisma.category.findUnique({
      where: { id: id },
      include: { channels: true },
    });
  }

  async getCategoryByCode(code: string): Promise<Category | null> {
    return await this.prisma.category.findUnique({
      where: { code: code },
      include: { channels: true },
    });
  }

  async createCategory(code: string, description: string): Promise<Category> {
    return await this.prisma.category.create({
      data: { code: code, description: description },
      include: { channels: true },
    });
  }

  async createCategories(
    data: Pick<Category, "code" | "description">[]
  ): Promise<Prisma.BatchPayload> {
    return await this.prisma.category.createMany({ data: data });
  }

  async deleteCategory(id: number): Promise<Category> {
    return await this.prisma.category.delete({
      where: { id: id },
      include: { channels: true },
    });
  }
}

const categoryRepository = new CategoryRepository(prisma);

export default categoryRepository;
