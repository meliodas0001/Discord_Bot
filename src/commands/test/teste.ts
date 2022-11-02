import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} from "discord.js";

import { GameRepository } from "../../modules/Games/repositories/GameRepository/GameRepository";
import { TwitchRepository } from "../../modules/Games/repositories/TwitchRepository/TwitchRepository";
import { GamePublish } from "../../config/modal.json";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("teste")
    .setDescription("Replies with Pong!"),
  async execute(interaction: ChatInputCommandInteraction) {
    const modal = new ModalBuilder()
      .setCustomId("SearchPlayerModal")
      .setTitle("Search for Players");

    const getGame = new TextInputBuilder()
      .setCustomId("getGame_name")
      .setLabel(GamePublish.titleGame)
      .setPlaceholder("Minecraft")
      .setRequired(true)
      .setStyle(TextInputStyle.Short);

    const getTimePlaying = new TextInputBuilder()
      .setCustomId("getTImePlaying")
      .setLabel(GamePublish.titleTimePlaying)
      .setRequired(true)
      .setPlaceholder("1 Year")
      .setStyle(TextInputStyle.Short);

    const firstActionRow: any = new ActionRowBuilder().addComponents(getGame);
    const secondActionRow: any = new ActionRowBuilder().addComponents(
      getTimePlaying
    );

    modal.addComponents(firstActionRow, secondActionRow);

    await interaction.showModal(modal);

    const modalSubmitInteraction = await interaction.awaitModalSubmit({
      filter: async (i) => {
        const getGameName = i.fields.fields.get("getGame_name")?.value;
        const getTimePlaying = i.fields.fields.get("getTImePlaying")?.value;

        if (getGameName && getTimePlaying) {
          try {
            const checkGame = await (
              await new TwitchRepository().GetGame(getGameName)
            ).data[0];
            const validate = await new GameRepository().getGame(checkGame.id);

            // Passa pelo banco de dados e verifica se o jogo existe, caso não exista cria um novo jogo no banco de dados
            if (!validate) {
              await new GameRepository().createGame(
                checkGame.name,
                checkGame.id
              );
            }

            // Se existir o jogo, é adicionado o jogo na lista de jogos da database
            await new GameRepository().createGameAnnounce(
              checkGame.name,
              checkGame.id,
              i.user.username,
              i.user.id,
              getTimePlaying
            );
          } catch (error) {
            // Se cair no erro é porque nenhum jogo foi encontrado na api da twitch
            await i.reply({
              content: `Game: ${getGameName} not founded`,
              ephemeral: true,
            });
            return false;
          }
        } else {
          throw new Error("gameName is undefined");
        }

        return true;
      },
      time: 99999,
    });

    modalSubmitInteraction.reply({
      content: GamePublish.successMessage,
      ephemeral: true,
    });
  },
};
