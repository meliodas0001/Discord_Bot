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
const commandPaths = fs.readdirSync(commandsPath);

for (const folder of commandPaths) {
  const commandPath = path.join(__dirname, `../../commands/${folder}`);
  const commandFile = fs
    .readdirSync(commandPath)
    .filter((file) => file.endsWith(".ts"));

  for (const file of commandFile) {
    const command: ICommand = require(`../../commands/${folder}/${file}`);
    const commandToJSON = command.data.toJSON();
    commands.push(commandToJSON);
  }
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

    console.log(`Successfully reloaded application (/) commands..`);
  } catch (error) {
    console.error(error);
  }
})();
