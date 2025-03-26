import express from "express";
import { createHandler } from "graphql-http/lib/use/express";
import expressPlayground from "graphql-playground-middleware-express";

import schema from "@app/schema/schema";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  "/graphql",
  createHandler({
    schema: schema,
  })
);
app.get("/playground", expressPlayground({ endpoint: "/graphql" }));

export default app;
