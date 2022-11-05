import { EmbedBuilder } from "@discordjs/builders";
import { Colors } from "discord.js";
import { GameRepository } from "../../../modules/Games/repositories/GameRepository/GameRepository";
import { TwitchRepository } from "../../../modules/Games/repositories/TwitchRepository/TwitchRepository";
import { PartyAnnounce } from "../../../utils/PartyAnnounce";

export async function ModalSearch_Players(interaction) {
  if (
    interaction.isModalSubmit() &&
    interaction.customId === "SearchPlayerModal"
  ) {
    const getGameName = interaction.fields.fields.get("getGame_name")?.value;
    const getTimePlaying =
      interaction.fields.fields.get("getTimePlaying")?.value;

    if (getGameName && getTimePlaying) {
      try {
        let checkGame = (await new TwitchRepository().GetGame(getGameName))
          .data[0];

        const imgReplaceOptions = checkGame.box_art_url.replace(
          "{width}x{height}",
          "500x600"
        );

        const validate = await new GameRepository().getGame(checkGame.id);

        const checkIfAnnounceExit = await new GameRepository().getAnnounce(
          interaction.user.id
        );

        const test = checkIfAnnounceExit?.forEach(async (x) => {
          if (x.gameId === checkGame.id) {
            return true;
          }
        });

        // Passa pelo banco de dados e verifica se o jogo existe, caso não exista cria um novo jogo no banco de dados
        if (!validate) {
          await new GameRepository().createGame(checkGame.name, checkGame.id);
        }

        // Se existir o jogo, é adicionado o jogo na lista de jogos da database
        if (test != undefined) {
          throw new Error("Your announce already Exists");
        }

        await new GameRepository().createGameAnnounce(
          checkGame.name,
          checkGame.id,
          interaction.user.tag,
          interaction.user.id,
          getTimePlaying
        );

        // const embed = {
        //   color: Colors.Green,
        //   title: `Your Game has been Announced`,
        //   author: interaction.user.username,
        //   description:
        //     "When i Found a new party i will call in this chat\n see you tomorrow! :)",
        //   image: {
        //     url: imgReplaceOptions,
        //   },
        // };

        const privateMessageEmbed = new EmbedBuilder()
          .setColor(Colors.Green)
          .setAuthor({
            name: interaction.user.username,
            iconURL: `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.png`,
          })
          .setTitle("Game Announced!")

          .setDescription(
            `Your game **${checkGame.name}** has been announced, when i found a new party i will call in this chat\n**See you tomorrow! :)**`
          )
          .setImage(imgReplaceOptions);

        await interaction.member.send({ embeds: [privateMessageEmbed] });

        await PartyAnnounce(checkGame.name, interaction.user.id, interaction);

        return await interaction.reply({
          content: `Your game ${checkGame.name} has been announced Successfull`,
          ephemeral: true,
        });
      } catch (error) {
        // Se cair no erro é porque nenhum jogo foi encontrado na api da twitch
        await interaction.reply({
          content: `${error}`,
          ephemeral: true,
        });
      }
    } else {
      return interaction.reply({
        content: "GameName is Undefined",
        ephemeral: true,
      });
    }
  }
}
