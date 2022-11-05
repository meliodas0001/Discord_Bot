import { Router } from "express";

export const findDuoRoute = Router();

findDuoRoute.get("/", (req, res) => {
  res.send(200);
});
