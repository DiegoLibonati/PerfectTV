import express from "express";

import { createHandler } from "graphql-http/lib/use/express";
import expressPlayground from "graphql-playground-middleware-express";

import { schema } from "@src/schemas/schema";
import { notFoundHandler } from "@src/middlewares/not_found_handler.middleware";
import { errorHandler } from "@src/middlewares/error_handler.middleware";

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

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
