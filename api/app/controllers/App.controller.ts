import { Request, Response } from "express";

import { responseSuccess } from "@app/constants/Response.constants";

class AppController {
  alive(req: Request, res: Response) {
    res.status(200).json({
      code: responseSuccess.alive.code,
      author: "Diego Martin Libonati",
      version: "1.0.0",
    });
  }
}

export default AppController;
