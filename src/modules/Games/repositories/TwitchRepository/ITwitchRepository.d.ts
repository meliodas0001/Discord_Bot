interface ITwitchRepository {
  GetGame(name: string): Promise<IGame | null>;
}
