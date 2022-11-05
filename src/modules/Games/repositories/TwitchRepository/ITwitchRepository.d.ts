interface IGame {
  data: [
    {
      id: string;
      name: string;
      box_art_url: string;
    }
  ];
}

interface ITwitchRepository {
  GetGame(name: string): Promise<IGame | null>;
}
