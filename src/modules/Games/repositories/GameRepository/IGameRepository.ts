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

  getGame(id: string): Promise<IGame>;
  createGame(name: string, id: string): Promise<void>;
}

export { IGameRepository, IGame };
