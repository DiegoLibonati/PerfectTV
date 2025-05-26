import express from "express";

import SourceController from "@app/controllers/Source.controller";

const sourceRoutes = express.Router();
const sourceController = new SourceController();

sourceRoutes
  .get("/", (req, res) => sourceController.getSources(req, res))
  .post("/", (req, res) => sourceController.addSource(req, res))
  .delete("/:idSource", (req, res) =>
    sourceController.deleteSource(req, res)
  );

export default sourceRoutes;
