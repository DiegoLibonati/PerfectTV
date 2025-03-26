import app from "@app/index";

import { config } from "@app/config/env.conf";

const { PORT, HOT_RELOAD } = config;

const onInit = () => {
  console.log(`Server running on  ${PORT} ✅`);

  if (HOT_RELOAD === "true")
    console.log("The server is using hot reloading to see new changes.");
  else console.log("The server is NOT using hot reloading to see new changes.");
};

app.listen(PORT, onInit);
