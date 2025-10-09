import { execSync } from "child_process";

export default async () => {
  console.log("Starting test database container...");

  try {
    const dbUrl =
      process.env.DATABASE_URL ||
      "postgresql://root:admin@host.docker.internal:5432/perfecttvdb-test?schema=public";

    process.env.DATABASE_URL = dbUrl;
    process.env.ENV = "testing";

    execSync(
      "docker-compose -f ../dev.docker-compose.yml up -d perfect-tv-db",
      {
        stdio: "inherit",
      }
    );

    console.log("DB container is running!");

    await new Promise((res) => setTimeout(res, 5000));

    console.log("Running prisma generate...");
    execSync("npx prisma generate", {
      stdio: "inherit",
      env: process.env,
    });

    console.log("Running prisma migrate dev...");
    execSync("npx prisma migrate dev --name init --skip-seed", {
      stdio: "inherit",
      env: process.env,
    });

    console.log("Prisma migrations applied!");
  } catch (error) {
    console.error("Error starting db container or applying migrations:", error);
    throw error;
  }
};
