import app from "@app/index";

import { config } from "@app/config/env.conf";
import prisma from "@app/database/Prisma.database";
import typesConstants from "@app/constants/Types.constants";
import categoriesConstants from "@app/constants/Categories.constants";
import sourcesConstants from "@app/constants/Sources.constants";
import getBasesConstantsParsed from "@app/constants/Base.constants";
import typeRepository from "@app/models/dataAccess/TypeRepository.model";
import categoryRepository from "@app/models/dataAccess/CategoryRepository.model";
import sourceRepository from "@app/models/dataAccess/SourceRepository.model";
import baseRepository from "@app/models/dataAccess/BaseRepository.model";

import "@app/routes/init";

const { PORT, HOT_RELOAD, PUPPETEER_EXECUTABLE_PATH } = config;

const onInit = () => {
  console.log(`Server running on  ${PORT} ✅`);
  console.log(`Navigator URL: ${PUPPETEER_EXECUTABLE_PATH}.`);
  console.log(`Documentation in /doc/v1/docs`);

  if (HOT_RELOAD === "true")
    console.log("The server is using hot reloading to see new changes.");
  else console.log("The server is NOT using hot reloading to see new changes.");

  onPrismaConnect();
};

const onPrismaConnect = async () => {
  try {
    await prisma.$connect();
    console.log("Database connection successful ✅");

    fillDatabase();
  } catch (error) {
    console.error("Error connecting to database ❌:", error);
    onPrismaConnect();
  }
};

const fillDatabase = async () => {
  console.log("Adding initial content to the database ⌛");

  const types = await typeRepository.getTypes();
  const categories = await categoryRepository.getCategories();
  const sources = await sourceRepository.getSources();
  const bases = await baseRepository.getBases();

  if (types.length || categories.length || sources.length || bases.length) {
    console.log("Content already exists in the database ✅");
    return;
  }

  await typeRepository.createTypes(typesConstants);
  await categoryRepository.createCategories(categoriesConstants);
  await sourceRepository.createSources(sourcesConstants);
  await baseRepository.createBases(await getBasesConstantsParsed());

  console.log("Initial content was successfully added to the database ✅");
};

app.listen(PORT, onInit);
