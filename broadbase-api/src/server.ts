import { envs } from "@/configs/env.config";
import { prisma } from "@/configs/prisma.config";

import app from "@/app";

import { TypesStartUp } from "@/startups/type.startup";
import { CategoriesStartUp } from "@/startups/category.startup";
import { SourcesStartUp } from "@/startups/source.startup";
import { BasesStartUp } from "@/startups/base.startup";

import { getBasesConstantsParsed } from "@/helpers/get_bases_constants_parsed.helper";

import {
  defaultBases,
  defaultCategories,
  defaultSources,
  defaultTypes,
} from "@/constants/defaults.constant";

const PORT = envs.PORT;
const ENV = envs.ENV;
const BASE_URL = envs.BASE_URL;

const handleSeedDatabase = async (): Promise<void> => {
  await TypesStartUp(defaultTypes);
  await CategoriesStartUp(defaultCategories);
  await SourcesStartUp(defaultSources);
  await BasesStartUp(await getBasesConstantsParsed(defaultBases));
};

const onInit = (): void => {
  handleSeedDatabase()
    .then(() => {
      const baseUrl = ENV === "development" ? `http://localhost:${PORT}` : BASE_URL;
      console.log(`Server running in ${ENV} mode on ${baseUrl}`);
    })
    .catch((err: unknown) => {
      console.error("Failed to seed database:", err);
      process.exit(1);
    });
};

const server = app.listen(PORT, onInit);

const shutdown = (): void => {
  server.close((err?: Error) => {
    void prisma.$disconnect().finally(() => {
      process.exit(err ? 1 : 0);
    });
  });

  setTimeout(() => {
    process.exit(1);
  }, 10000).unref();
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
