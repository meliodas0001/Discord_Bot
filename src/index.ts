import "dotenv/config";
import { Client, Collection } from "discord.js";

import { EventHandler } from "./utils/Handlers/EventHandler";
import { CommandHandler } from "./utils/Handlers/CommandHandler";

const client = new Client({ intents: 32767 });

client.commands = new Collection();

EventHandler(client);
CommandHandler(client);
import "./utils/SlashBuilder";

import { GameRepository } from "./modules/Games/repositories/GameRepository/GameRepository";

async function teste() {
  console.log(await new GameRepository().getAnnounce("290853252646305792"));
}

teste();

client.login(process.env.TOKEN);
