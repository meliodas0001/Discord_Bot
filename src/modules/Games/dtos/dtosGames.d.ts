interface IExecute {
  gameName: string;
  discordId: string;
  discordName: string;
  timePlaying: string;
  useMicrophone?: boolean;
}

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

interface IGameR {
  name: string;
  id: string;
  adGames: AdGames[];
}

interface IGame {
  data: [
    {
      id: string;
      name: string;
      box_art_url: string;
    }
  ];
}
