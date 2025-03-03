import app from "@app/index";
import appRoutes from "@app/routes/v1/App.routes";
import docsRoutes from "@app/routes/v1/Docs.routes";
import { responseConstants } from "@app/constants/Response.constants";

app.use("/app/v1", appRoutes);
app.use("/doc/v1", docsRoutes);
app.use("*", (req, res) => {
  const baseUrl = req.baseUrl;

  res.status(404).json({
    message: `${responseConstants.notFoundRoute.message} Path: ${baseUrl}`,
    code: responseConstants.notFoundRoute.code,
  });
});
