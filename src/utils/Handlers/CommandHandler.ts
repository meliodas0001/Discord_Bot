import path from "path";
import fs from "fs";
import { Client } from "discord.js";

const commandsPath = path.join(__dirname, "../../commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".ts"));

export function CommandHandler(client: Client) {
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
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
