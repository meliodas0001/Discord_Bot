import { IGame, ITwitchRepository } from "./ITwitchRepository";
import axios from "axios";

class TwitchRepository implements ITwitchRepository {
  constructor() {}
  async GetGame(name: string): Promise<IGame> {
    const game = await axios.get(
      `https://api.twitch.tv/helix/games/?name=${name}`,
      {
        headers: {
          "Client-Id": process.env.TwitchID,
          Authorization: `Bearer ${process.env.BearerToken}`,
        },
      }
    );

    if (game.data.data.length === 0) {
      throw new Error("Game does not exist!");
    }

    return game.data;
  }
}

export { TwitchRepository };
