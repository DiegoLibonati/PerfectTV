import { envs } from "@src/configs/env.config";

import app from "@src/app";

import { TypesStartUp } from "@src/startups/type.startup";
import { CategoriesStartUp } from "@src/startups/category.startup";
import { SourcesStartUp } from "@src/startups/source.startup";
import { BasesStartUp } from "@src/startups/base.startup";

import { getBasesConstantsParsed } from "@src/helpers/get_bases_constants_parsed.helper";

import {
  defaultBases,
  defaultCategories,
  defaultSources,
  defaultTypes,
} from "@src/constants/defaults.constant";

const PORT = envs.PORT;
const ENV = envs.ENV;
const BASE_URL = envs.BASE_URL;

const onInit = async () => {
  const baseUrl = ENV === "development" ? `http://localhost:${PORT}` : BASE_URL;

  console.log(`🚀 Server running in ${ENV} mode on ${baseUrl}`);

  await TypesStartUp(defaultTypes);
  await CategoriesStartUp(defaultCategories);
  await SourcesStartUp(defaultSources);
  await BasesStartUp(await getBasesConstantsParsed(defaultBases));
};

app.listen(PORT, onInit);
