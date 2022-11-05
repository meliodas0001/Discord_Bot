import axios from "axios";

class TwitchRepository implements ITwitchRepository {
  constructor() {}
  async GetGame(name: string): Promise<IGame | null> {
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
      return null;
    }

    return game.data;
  }
}

export { TwitchRepository };
