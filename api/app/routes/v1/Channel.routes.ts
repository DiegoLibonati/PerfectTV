import express from "express";

import ChannelController from "@app/controllers/Channel.controller";

const channelRoutes = express.Router();
const channelController = new ChannelController();

channelRoutes
  .get("/", (req, res) => channelController.getChannels(req, res))
  .post("/add", (req, res) => channelController.addChannel(req, res))
  .patch("/update/:idChannel", (req, res) =>
    channelController.updateChannel(req, res)
  )
  .delete("/delete/:idChannel", (req, res) =>
    channelController.deleteChannel(req, res)
  );

export default channelRoutes;
