import express from "express";

import TypeController from "@app/controllers/Type.controller";

const typeRoutes = express.Router();
const typeController = new TypeController();

typeRoutes
  .get("/", (req, res) => typeController.getTypes(req, res))
  .post("/", (req, res) => typeController.addType(req, res))
  .delete("/:idType", (req, res) => typeController.deleteType(req, res));

export default typeRoutes;
