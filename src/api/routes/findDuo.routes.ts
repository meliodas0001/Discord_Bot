import { Router } from "express";

export const findDuoRoute = Router();

import { CreateAnnounceController } from "../../modules/Games/useCases/createAnnounce/CreateAnnounceController";

const createAnnounceController = new CreateAnnounceController();

findDuoRoute.post("/create", createAnnounceController.handle);
