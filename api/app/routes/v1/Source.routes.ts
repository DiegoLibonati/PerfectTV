import express from "express";

import SourceController from "@app/controllers/Source.controller";

const sourceRoutes = express.Router();
const sourceController = new SourceController();

sourceRoutes
  .get("/", (req, res) => sourceController.getSources(req, res))
  .post("/add", (req, res) => sourceController.addSource(req, res))
  .delete("/delete/:idSource", (req, res) =>
    sourceController.deleteSource(req, res)
  );

export default sourceRoutes;
