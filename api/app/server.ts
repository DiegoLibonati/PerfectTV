import app from "@app/index";
import { config } from "@app/config/env.conf";
import "@app/routes/init";

const { PORT } = config;

const onInit = () => {
  console.log(`Servidor corriendo en ${PORT} ✅`);
  console.log(`Documentación en /doc/v1/docs`);
};

app.listen(PORT, onInit);
