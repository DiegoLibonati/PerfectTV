import path from "path";
import { execSync } from "child_process";

module.exports = async () => {
  process.env.DATABASE_URL =
    "postgresql://root:admin@host.docker.internal:5432/perfecttvdb?schema=public";
  process.env.TEST_ENVIRONMENT = "true";

  console.log("Starting db container...");
  try {
    // Especifica el archivo correcto
    execSync("docker-compose -f dev.docker-compose.yml up -d perfect-tv-db", {
      stdio: "inherit",
      cwd: path.resolve(__dirname, "../.."),
    });
    console.log("db container is running!");
  } catch (error) {
    console.error("Error starting db container:", error);
    throw error;
  }
};
