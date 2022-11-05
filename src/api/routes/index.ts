import { Router } from "express";

import { findDuoRoute } from "./findDuo.routes";

const router = Router();

router.use("/findDuo", findDuoRoute);

export { router };
