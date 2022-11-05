import { container } from "tsyringe";

import { GameRepository } from "../../../modules/Games/repositories/GameRepository/GameRepository";
import { TwitchRepository } from "../../../modules/Games/repositories/TwitchRepository/TwitchRepository";

container.registerSingleton<IGameRepository>("GameRepository", GameRepository);

container.registerSingleton<ITwitchRepository>(
  "TwitchRepository",
  TwitchRepository
);
