import { IGameRepository } from "./IGameRepository";
import { PrismaClient } from "@prisma/client";
import { IGame } from "./IGameRepository";

const prisma = new PrismaClient();

class GameRepository implements IGameRepository {
  constructor() {}
  async createGameAnnounce(
    gameName: string,
    gameId: string,
    discordName: string,
    discordId: string,
    timePlaying: string
  ) {
    await prisma.adGames.create({
      data: {
        gameId,
        name: gameName,
        discordName,
        discordId,
        timePlaying,
      },
    });
  }
  async getGame(id: string): Promise<IGame> {
    const games = await prisma.game.findUnique({
      select: {
        id: true,
        name: true,
        adGames: true,
      },
      where: {
        id,
      },
    });

    if (!games) {
      throw new Error("No game as found");
    }

    return games;
  }
  async createGame(name: string, id: string): Promise<void> {
    await prisma.game.create({
      data: {
        name,
        id,
      },
    });
  }
}

export { GameRepository };
