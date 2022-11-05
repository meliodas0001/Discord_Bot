import "reflect-metadata";

import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import "express-async-errors";
import { AppError } from "./errors/AppError";

import { router } from "./routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }
    return response.status(500).json({
      status: "error",
      message: `Internal Server - ${err.message}`,
    });
  }
);

app.listen(3333, () => console.log("Api is Running!"));
