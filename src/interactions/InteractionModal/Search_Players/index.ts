import { GameRepository } from "../../../modules/Games/repositories/GameRepository/GameRepository";
import { TwitchRepository } from "../../../modules/Games/repositories/TwitchRepository/TwitchRepository";

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
        const checkGame = (await new TwitchRepository().GetGame(getGameName))
          .data[0];
        const validate = await new GameRepository().getGame(checkGame.id);

        const checkIfAnnounceExit = await new GameRepository().getAnnounce(
          interaction.user.id
        );

        const test = checkIfAnnounceExit?.forEach(async (x) => {
          if (x.gameId === checkGame.id) {
            return true;
          }
        });

        console.log(test, "aquii");

        // Passa pelo banco de dados e verifica se o jogo existe, caso não exista cria um novo jogo no banco de dados
        if (!validate) {
          await new GameRepository().createGame(checkGame.name, checkGame.id);
        }

        // Se existir o jogo, é adicionado o jogo na lista de jogos da database
        if (test != undefined) {
          throw new Error("Your announce already Exists");
        } else {
          await new GameRepository().createGameAnnounce(
            checkGame.name,
            checkGame.id,
            interaction.user.username,
            interaction.user.id,
            getTimePlaying
          );

          return await interaction.reply({
            content: `Your game ${checkGame.name} has been announced Successfull`,
            ephemeral: true,
          });
        }
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
