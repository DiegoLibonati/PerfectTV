import app from "@app/index";

import { responseNotFound } from "@app/constants/Response.constants";
import appRoutes from "@app/routes/v1/App.routes";
import docsRoutes from "@app/routes/v1/Docs.routes";
import typeRoutes from "@app/routes/v1/Type.routes";
import categoryRoutes from "@app/routes/v1/Category.routes";
import channelRoutes from "@app/routes/v1/Channel.routes";
import sourceRoutes from "@app/routes/v1/Source.routes";
import baseRoutes from "@app/routes/v1/Base.routes";

const prefix = "/api/v1";

app.use(`${prefix}/apps`, appRoutes);
app.use(`${prefix}/docs`, docsRoutes);
app.use(`${prefix}/types`, typeRoutes);
app.use(`${prefix}/categories`, categoryRoutes);
app.use(`${prefix}/channels`, channelRoutes);
app.use(`${prefix}/sources`, sourceRoutes);
app.use(`${prefix}/bases`, baseRoutes);

app.use("*", (req, res) => {
  const baseUrl = req.baseUrl;

  res.status(404).json({
    message: `Path: ${baseUrl}`,
    code: responseNotFound.route.code,
  });
});
