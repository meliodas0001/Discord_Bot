import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../api/errors/AppError";

@injectable()
export class CreateAnnounceUseCase {
  constructor(
    @inject("GameRepository")
    private gameRepository: IGameRepository,

    @inject("TwitchRepository")
    private twitchRepository: ITwitchRepository
  ) {}

  async execute({
    gameName,
    discordId,
    discordName,
    timePlaying,
    useMicrophone,
  }: IExecute): Promise<void> {
    let verifyExist = false;

    console.log(gameName, discordId, discordName, timePlaying, useMicrophone);

    const verifyIfGameExist = await this.twitchRepository.GetGame(gameName);
    const verifyIfAnnounceExist = await this.gameRepository.getAnnounceOfPlayer(
      discordId
    );

    console.log(verifyIfAnnounceExist);

    if (!verifyIfGameExist) {
      throw new AppError("Game does not exist", 400);
    }

    const verifyIfGameExistInDB = await this.gameRepository.getGame(
      verifyIfGameExist?.data[0].id
    );

    if (!verifyIfGameExistInDB) {
      await this.gameRepository.createGame(
        verifyIfGameExist.data[0].name,
        verifyIfGameExist.data[0].id
      );
    }

    verifyIfAnnounceExist?.forEach((announces) => {
      if (announces.name === verifyIfGameExist.data[0].name) {
        verifyExist = true;
      }
    });

    if (verifyExist != false) {
      throw new AppError("You already have announce");
    }

    await this.gameRepository.createGameAnnounce(
      verifyIfGameExist.data[0].name,
      verifyIfGameExist.data[0].id,
      discordName,
      discordId,
      timePlaying,
      useMicrophone ? useMicrophone : false
    );
  }
}
