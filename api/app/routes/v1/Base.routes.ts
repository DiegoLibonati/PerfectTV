import express from "express";

import BaseController from "@app/controllers/Base.controller";

const baseRoutes = express.Router();
const baseController = new BaseController();

baseRoutes
  .get("/", (req, res) => baseController.getBases(req, res))
  .post("/", (req, res) => baseController.addBase(req, res))
  .patch("/:idBase", (req, res) => baseController.updateBase(req, res))
  .delete("/:idBase", (req, res) => baseController.deleteBase(req, res));

export default baseRoutes;
