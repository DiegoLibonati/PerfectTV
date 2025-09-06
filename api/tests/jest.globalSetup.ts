import path from "path";
import { execSync } from "child_process";

module.exports = async () => {
  process.env.DATABASE_URL =
    "postgresql://root:admin@host.docker.internal:5432/perfecttvdb?schema=public";
  process.env.TEST_ENVIRONMENT = "true";

  const apiPath = path.resolve(__dirname, "..");

  console.log("Starting db container...");
  try {
    execSync("docker-compose -f dev.docker-compose.yml up -d perfect-tv-db", {
      stdio: "inherit",
      cwd: path.resolve(__dirname, "../.."),
    });
    console.log("✔ db container is running!");

    execSync("npx prisma generate --schema=./prisma/schema.prisma", {
      stdio: "inherit",
      cwd: apiPath,
    });
    console.log("✔ Prisma client generated!");

    execSync("npx prisma db push --schema=./prisma/schema.prisma", {
      stdio: "inherit",
      cwd: apiPath,
    });
    console.log("✔ Database schema pushed!");

    execSync(
      "npx prisma db execute --schema=./prisma/schema.prisma --file=./prisma/test-seed.sql",
      {
        stdio: "inherit",
        cwd: apiPath,
      }
    );
    console.log("✔ Test seed data inserted!");
  } catch (error) {
    console.error("❌ Error starting db container or preparing DB:", error);
    throw error;
  }
};
