import { Router } from "express";

export const findDuoRoute = Router();

import { CreateAnnounceController } from "../../modules/Games/useCases/createAnnounce/CreateAnnounceController";
import { FindPlayerAnnounceController } from "../../modules/Games/useCases/findPlayer/FindPlayerAnnounceController";

const createAnnounceController = new CreateAnnounceController();
const findPlayerAnnounceController = new FindPlayerAnnounceController();

findDuoRoute.post("/create", createAnnounceController.handle);
findDuoRoute.get("/findPlayer", findPlayerAnnounceController.handle);
