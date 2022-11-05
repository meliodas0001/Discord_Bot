import { IGameRepository } from "./IGameRepository";
import { AdGames, PrismaClient } from "@prisma/client";
import { IGame } from "./IGameRepository";

class GameRepository implements IGameRepository {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }
  async deleteAnnounce(id: string): Promise<void> {
    await this.prisma.adGames.delete({
      where: {
        id,
      },
    });
  }

  async getAnnounce(name: string): Promise<AdGames[] | null> {
    const Announce = await this.prisma.adGames.findMany({
      select: {
        id: true,
        gameId: true,
        name: true,
        discordName: true,
        discordId: true,
        haveMic: true,
        timePlaying: true,
        createdAt: true,
      },
      where: {
        name,
      },
    });

    if (!Announce) {
      return null;
    }

    return Announce;
  }

  async getAnnounceOfPlayer(discordId: string): Promise<AdGames[] | null> {
    const Announces = await this.prisma.adGames.findMany({
      select: {
        id: true,
        gameId: true,
        name: true,
        discordName: true,
        discordId: true,
        haveMic: true,
        timePlaying: true,
        createdAt: true,
      },
      where: {
        discordId,
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
    await this.prisma.adGames.create({
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
    const games = await this.prisma.game.findUnique({
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
    await this.prisma.game.create({
      data: {
        name,
        id,
      },
    });
  }
}

export { GameRepository };
