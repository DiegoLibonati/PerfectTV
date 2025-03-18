import express from "express";

import BaseController from "@app/controllers/Base.controller";

const baseRoutes = express.Router();
const baseController = new BaseController();

baseRoutes
  .get("/", (req, res) => baseController.getBases(req, res))
  .post("/add", (req, res) => baseController.addBase(req, res))
  .patch("/update/:idBase", (req, res) => baseController.updateBase(req, res))
  .delete("/delete/:idBase", (req, res) => baseController.deleteBase(req, res));

export default baseRoutes;
