import { RequestHandler, Router } from "express";

import { ChannelController } from "@src/controllers/channel.controller";

const router = Router();

router.get("/", ChannelController.getChannels as RequestHandler);
router.get("/numbers", ChannelController.getChannelsNumber as RequestHandler);
router.get("/:number", ChannelController.getChannelByNumber as RequestHandler);
router.post("/", ChannelController.addChannel as RequestHandler);
router.patch("/:id", ChannelController.updateChannel as RequestHandler);
router.delete("/:id", ChannelController.deleteChannel as RequestHandler);

export default router;
