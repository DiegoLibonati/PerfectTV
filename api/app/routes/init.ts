import app from "@app/index";
import appRoutes from "@app/routes/v1/App.routes";
import docsRoutes from "@app/routes/v1/Docs.routes";
import typeRoutes from "@app/routes/v1/Type.routes";
import categoryRoutes from "@app/routes/v1/Category.routes";
import channelRoutes from "@app/routes/v1/Channel.routes";
import { responseNotFound } from "@app/constants/Response.constants";

app.use("/app/v1", appRoutes);
app.use("/doc/v1/docs", docsRoutes);
app.use("/type/v1/types", typeRoutes);
app.use("/category/v1/categories", categoryRoutes);
app.use("/channel/v1/channels", channelRoutes);

app.use("*", (req, res) => {
  const baseUrl = req.baseUrl;

  res.status(404).json({
    message: `${responseNotFound.route.message} Path: ${baseUrl}`,
    code: responseNotFound.route.code,
  });
});
