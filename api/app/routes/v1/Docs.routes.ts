import express from "express";

import DocsController from "@app/controllers/Docs.controller";

const docsRoutes = express.Router();
const docsController = new DocsController();

docsRoutes
  .get("/swagger.json", (req, res) => docsController.getSwaggerFile(req, res))
  .get("/docs", (req, res) => docsController.getDocs(req, res));

export default docsRoutes;
