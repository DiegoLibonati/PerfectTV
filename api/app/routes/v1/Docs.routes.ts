import express from "express";

import DocsController from "@app/controllers/Docs.controller";

const docsRoutes = express.Router();
const docsController = new DocsController();

docsRoutes
  .get("/", (req, res) => docsController.getDocs(req, res))
  .get("/swagger.json", (req, res) => docsController.getSwaggerFile(req, res));

export default docsRoutes;
