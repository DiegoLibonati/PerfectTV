import { Router } from "express";

import typeRoutes from "@src/routes/v1/type.route"
import categoryRoutes from "@src/routes/v1/category.route"
import channelRoutes from "@src/routes/v1/channel.route"
import sourceRoutes from "@src/routes/v1/source.route"
import baseRoutes from "@src/routes/v1/base.route"

const router = Router();

router.use("/types", typeRoutes);
router.use("/categories", categoryRoutes);
router.use("/channels", channelRoutes);
router.use("/sources", sourceRoutes);
router.use("/bases", baseRoutes);

export default router;