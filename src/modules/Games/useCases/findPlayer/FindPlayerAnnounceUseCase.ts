import { injectable, inject } from "tsyringe";
import { AppError } from "../../../../api/errors/AppError";

@injectable()
export class FindPlayerAnnounceUseCase {
  constructor(
    @inject("GameRepository")
    private gameRepository: IGameRepository
  ) {}

  async execute(discordId: string): Promise<AdGames[] | null> {
    const Announces = await this.gameRepository.getAnnounceOfPlayer(discordId);

    if (Announces === null) {
      throw new AppError("User does not exist", 400);
    }

    return Announces;
  }
}
