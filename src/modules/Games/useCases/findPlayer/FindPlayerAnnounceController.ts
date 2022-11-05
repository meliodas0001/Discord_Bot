import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindPlayerAnnounceUseCase } from "./FindPlayerAnnounceUseCase";

export class FindPlayerAnnounceController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { discordId } = request.body;

    const findPlayerAnnounceUseCase = container.resolve(
      FindPlayerAnnounceUseCase
    );

    const Announces = await findPlayerAnnounceUseCase.execute(discordId);

    return response.send(Announces).status(200);
  }
}
