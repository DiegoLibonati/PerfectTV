import path from "path";

import { Request, Response } from "express";
import redoc from "redoc-express";

class DocsController {
  getSwaggerFile(req: Request, res: Response) {
    const filePath = path.join(__dirname, "../../swagger.json");
    res.sendFile(filePath);
  }

  getDocs(req: Request, res: Response) {
    return redoc({
      title: "PerfectTV API Documentation",
      specUrl: "/doc/v1/swagger.json",
    })(req, res);
  }
}

export default DocsController;
