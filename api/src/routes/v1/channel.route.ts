import { Router } from "express";

import { ChannelController } from "@src/controllers/channel.controller";

const router = Router();

router.get("/", ChannelController.getChannels);
router.get("/numbers", ChannelController.getChannelsNumber);
router.get("/:number", ChannelController.getChannelByNumber);
router.post("/", ChannelController.addChannel);
router.patch("/:id", ChannelController.updateChannel);
router.delete("/:id", ChannelController.deleteChannel);

export default router;
