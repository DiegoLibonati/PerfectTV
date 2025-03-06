import app from "@app/index";
import { config } from "@app/config/env.conf";
import prisma from "@app/database/Prisma.database";
import { typesConstants } from "./constants/Types.constants";
import { categoriesConstants } from "./constants/Categories.constants";
import "@app/routes/init";

const { PORT, HOT_RELOAD } = config;

const onInit = () => {
  console.log(`Server running on  ${PORT} ✅`);
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

  const types = await prisma.type.findMany();
  const categories = await prisma.category.findMany();

  if (types.length || categories.length) {
    console.log("Content already exists in the database ✅");
    return;
  }

  await prisma.type.createMany({ data: typesConstants });
  await prisma.category.createMany({ data: categoriesConstants });

  console.log("Initial content was successfully added to the database ✅");
};

app.listen(PORT, onInit);
