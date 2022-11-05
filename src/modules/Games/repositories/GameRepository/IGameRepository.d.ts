interface IGameRepository {
  createGameAnnounce(
    gameName: string,
    gameId: string,
    discordName: string,
    discordId: string,
    timePlaying: string,
    haveMicrophone?: boolean
  );

  getGame(id: string): Promise<IGameR | null>;
  createGame(name: string, id: string): Promise<void>;
  getAnnounceOfPlayer(discordId: string): Promise<AdGames[] | null>;
  getAnnounce(name: string): Promise<AdGames[] | null>;
  deleteAnnounce(id: string): Promise<void>;
}
