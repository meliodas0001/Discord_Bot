import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} from "discord.js";

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
      filter: (i) => {
        console.log(i.fields.fields);
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
