import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateAnnounceUseCase } from "./CreateAnnounceUseCase";

export class CreateAnnounceController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { gameName, discordId, discordName, timePlaying, useMicrophone } =
      request.body;

    const createAnnounceUseCase = container.resolve(CreateAnnounceUseCase);

    await createAnnounceUseCase.execute({
      gameName,
      discordId,
      discordName,
      timePlaying,
      useMicrophone,
    });

    return response.send("foi");
  }
}
