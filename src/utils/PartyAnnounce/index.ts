import { Colors, Embed, EmbedBuilder, MessageInteraction } from "discord.js";
import { GameRepository } from "../../modules/Games/repositories/GameRepository/GameRepository";

export async function PartyAnnounce(
  gameName: string,
  discordId: string,
  interaction: MessageInteraction
) {
  const getAnnounces = await new GameRepository().getAnnounce(gameName);

  if (!getAnnounces) {
    throw new Error("getAnnounces is null");
  }

  if (getAnnounces.length < 2) {
    return null;
  }

  const verifyAndRemoveUserAnnounce = getAnnounces.filter(
    (announce) => announce.discordId != discordId
  );

  const getFirstUser = getAnnounces.filter(
    (announce) => announce.discordId === discordId
  );

  const userOne = new EmbedBuilder()
    .setColor(Colors.Green)
    .setDescription(
      `**User matched in game: ${verifyAndRemoveUserAnnounce[0].name}!!!**\nsend a friend request to be able to play in a group\nUser Tag: ${getFirstUser[0].discordName}`
    )
    .setTimestamp();

  const userTwo = new EmbedBuilder()
    .setColor(Colors.Green)
    .setDescription(
      `**User matched in game: ${verifyAndRemoveUserAnnounce[0].name}!!!**\nsend a friend request to be able to play in a group\nUser Tag: ${verifyAndRemoveUserAnnounce[0].discordName}`
    )
    .setTimestamp();

  // User filtrado
  await (
    await interaction.user.client.users.createDM(
      `${verifyAndRemoveUserAnnounce[0].discordId}`
    )
  ).send({ embeds: [userOne] });

  // User que acabou de enviar
  await (
    await interaction.user.client.users.createDM(discordId)
  ).send({ embeds: [userTwo] });

  await new GameRepository().deleteAnnounce(getFirstUser[0].id);
  await new GameRepository().deleteAnnounce(verifyAndRemoveUserAnnounce[0].id);
}
