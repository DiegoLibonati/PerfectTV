import { Request, Response } from "express";

import { responseConstants } from "@app/constants/Response.constants";

class AppController {
  alive(req: Request, res: Response) {
    res.status(200).json({
      code: responseConstants.successAlive.code,
      message: responseConstants.successAlive.message,
      author: "Diego Martin Libonati",
      version: "1.0.0",
    });
  }
}

export default AppController;
