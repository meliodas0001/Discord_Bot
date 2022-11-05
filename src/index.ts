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
import { PartyAnnounce } from "./utils/PartyAnnounce";

async function teste() {
  // // await PartyAnnounce("God of War", "290853252646305792");
  // console.log(await client.users.fetch("972606024190144532"));
}

teste();

client.login(process.env.TOKEN);
