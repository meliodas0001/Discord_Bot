import "reflect-metadata";
import "dotenv/config";
import { Client, Collection } from "discord.js";

import { EventHandler } from "./utils/Handlers/EventHandler";
import { CommandHandler } from "./utils/Handlers/CommandHandler";

const client = new Client({ intents: 32767 });

client.commands = new Collection();

EventHandler(client);
CommandHandler(client);
import "./utils/SlashBuilder";
import "./api/server";
import { GameRepository } from "./modules/Games/repositories/GameRepository/GameRepository";
import { container } from "tsyringe";

client.login(process.env.TOKEN);
