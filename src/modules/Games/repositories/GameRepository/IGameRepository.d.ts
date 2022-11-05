interface AdGames {
  id: string;
  gameId: string;
  name: string;
  discordName: string;
  discordId: string;
  haveMic: boolean;
  timePlaying: string;
  createdAt: Date;
}

interface IGame {
  name: String;
  id: String;
  adGames: AdGames[];
}

interface IGameRepository {
  createGameAnnounce(
    gameName: string,
    gameId: string,
    discordName: string,
    discordId: string,
    timePlaying: string
  );

  getGame(id: string): Promise<IGame | null>;
  createGame(name: string, id: string): Promise<void>;
  getAnnounceOfPlayer(discordId: string): Promise<AdGames[] | null>;
  getAnnounce(name: string): Promise<AdGames[] | null>;
  deleteAnnounce(id: string): Promise<void>;
}

export { IGameRepository, IGame };
