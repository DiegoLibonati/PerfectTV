import app from "@app/index";
import { config } from "@app/config/env.conf";
import prisma from "@app/database/Prisma.database";
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
  } catch (error) {
    console.error("Error connecting to database ❌:", error);
    onPrismaConnect();
  }
};

app.listen(PORT, onInit);
