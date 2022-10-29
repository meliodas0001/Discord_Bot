import {
  REST,
  RESTPostAPIApplicationCommandsJSONBody,
  Routes,
  SlashCommandBuilder,
} from "discord.js";
import fs from "node:fs";
import path from "path";

interface ICommand {
  data: SlashCommandBuilder;
}

const commands: RESTPostAPIApplicationCommandsJSONBody[] = [];
const commandsPath = path.join(__dirname, "../../commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".ts"));

for (const file of commandFiles) {
  const command: ICommand = require(`../../commands/${file}`);
  const commandToJSON = command.data.toJSON();
  commands.push(commandToJSON);
}

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    );

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.clientId,
        process.env.guildId
      ),
      {
        body: commands,
      }
    );

    console.log(`Successfully reloaded application (/) commands.`);
  } catch (error) {
    console.error(error);
  }
})();
