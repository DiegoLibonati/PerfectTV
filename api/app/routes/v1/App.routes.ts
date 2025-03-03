import express from "express";

import AppController from "@app/controllers/App.controller";

const appRoutes = express.Router();
const appController = new AppController();

appRoutes.get("/alive", (req, res) => appController.alive(req, res));

export default appRoutes;
