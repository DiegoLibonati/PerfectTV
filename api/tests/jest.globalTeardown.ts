import { execSync } from "child_process";
import path from "path";

module.exports = async () => {
  console.log("Stopping db container...");
  try {
    // Especifica el archivo correcto
    execSync("docker-compose -f dev.docker-compose.yml down", {
      stdio: "inherit",
      cwd: path.resolve(__dirname, "../.."),
    });
    console.log("db container stopped!");
  } catch (error) {
    console.error("Error stopping db container:", error);
  }
};
