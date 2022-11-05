import { IGameRepository } from "./IGameRepository";
import { AdGames, PrismaClient } from "@prisma/client";
import { IGame } from "./IGameRepository";

const prisma = new PrismaClient();

class GameRepository implements IGameRepository {
  constructor() {}

  async getAnnounce(id: string): Promise<AdGames[] | null> {
    const Announces = await prisma.adGames.findMany({
      select: {
        id: true,
        discordId: true,
        discordName: true,
        createdAt: true,
        game: true,
        gameId: true,
        haveMic: true,
        name: true,
        timePlaying: true,
      },
      where: {
        discordId: id,
      },
    });

    if (!Announces) {
      return null;
    }

    return Announces;
  }

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

  async getGame(id: string): Promise<IGame | null> {
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
      return null;
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
