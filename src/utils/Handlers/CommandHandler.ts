import path from "path";
import fs from "fs";
import { Client } from "discord.js";

export function CommandHandler(client: Client) {
  const commandsPath = path.join(__dirname, "../../commands");
  const commandPath = fs.readdirSync(commandsPath);

  for (const folder of commandPath) {
    const commandPath = path.join(__dirname, `../../commands/${folder}`);
    const commandFile = fs
      .readdirSync(commandPath)
      .filter((file) => file.endsWith(".ts"));

    for (const file of commandFile) {
      const filePath = path.join(commandPath, file);
      const command = require(filePath);

      if ("data" in command && "execute" in command) {
        client.commands.set(command.data.name, command);
      } else {
        console.log(
          `The command at ${filePath} is missing "data" or "execute" property`
        );
      }
    }
  }
}
